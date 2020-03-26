const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1, page_size = 5 } = request.query;
        const [count] = await connection('incidents').count();
        const inscident = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(page_size)
            .offset((page - 1) * page_size)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(inscident);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const inscident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (inscident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operação não permitida!' })
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    },

}