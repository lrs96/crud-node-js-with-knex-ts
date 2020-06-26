import {Response, Request } from 'express'
import knex from '../database/connection';

class User {
    async show(req: Request, res: Response) {
        try{
            const users = await knex('users').select('*');
            if(users != null) {
                const serelizadedUsers = users.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        age: user.age
                    }
                })
                return res.json(serelizadedUsers)
            }
            return res.json({'message': 'Não existem alunos cadastrados'})
        }
        catch(e) {
            return res.json({
                'message': 'erro ao selecionar os alunos',
                'error': e
            })
        }

    }

    async show_user(req: Request, res: Response) {
        return res.json({message: 'success'})
    }

    async create(req: Request, res: Response) {
        try {
            const { name, lastname, email, age } = req.body;
            const user = {name, lastname, email, age}
            const trx = await knex.transaction();
            await trx('users').insert(user);
            await trx.commit()
            return res.json({
                'message': 'usuário cadastrado com sucesso',
                ...user
            })
        }
        catch(e) {
            return res.json({'message': 'Erro ao cadastrar o usuário'})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id_user = req.params.id;
            const {name, lastname, email, age } = req.body;
            await knex('users')
            .where('id', '=', id_user)
            .update({
                name,
                lastname,
                email,
                age
            });
            return res.json({
                message: 'Usuário atualizado com sucesso'
            })
        } catch(e){ 
            console.log(`Erro ao atualizar o usuário: ${e}`)
            return res.json({'message': 'Erro ao atualizar o dado do usuário'})
        }
        return res.json({
            message: 'Esse usuário não existe'
        })
    }

    async delete(req: Request, res: Response) {
        try {
            const id_user = req.params.id;
            await knex('users')
                .where('id', id_user).del();
            return res.json({
                message: "Usuário excluído com sucesso"
            })
        } catch(e) {
            console.log(`Erro ao deletar o usuário: ${e.message}`)
            return res.json({message: 'erro ao deletar o aluno'})
        }
        return res.json({
            message: "Esse usuário não existe"
        })
    }
}

export default User;