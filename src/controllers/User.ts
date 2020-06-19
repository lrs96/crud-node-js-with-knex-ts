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
            const dados = req.params;
            const {name, lastname, email, age } = req.body;
            console.log(`
                nome: ${name},
                lastname: ${lastname},
                email: ${email},
                age: ${age}
            `)
            await knex('users').update({
                name: name,
                lastname: lastname,
                email: email,
                age: age
            }).where('id', dados);
            
            const trx = await knex.transaction();
            // await trx('users').where({'id': dados})
            //     .update({
            //         name: name,
            //         lastname: lastname,
            //         email: email,
            //         age: age
            //     });
            await trx.commit()
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
            const dados = req.params;
            const trx = await knex.transaction()
            await trx('users').where('id', dados).del();
            return res.json({
                message: "Usuário excluído com sucesso"
            })
        } catch(e) {
            console.log(`Erro ao deletar o usuário: ${e.message}`)
        }
        return res.json({
            message: "Esse usuário não existe"
        })
    }
}

export default User;