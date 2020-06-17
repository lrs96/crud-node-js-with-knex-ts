import {Response, Request } from 'express'
import knex from '../database/connection';


class User {
    async show(req: Request, res: Response) {
        try{
            const users = await knex('users').select('*');
            if(users != null) {
                const serelizadedUsers = users.map(user => {
                    return {
                        name: user.name,
                        lastname: user.lastname,
                        email: user.lastname,
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
        console.log('acessou a tela')
        const dado = req.param;
        console.log(dado)
        try {
            const dados = req.param;
            console.log(`dados do params: ${dados}`)
        } catch(e){ 
            return res.json({'message': 'Erro ao atualizar o dado do usuário'})
        }
        return res.send('update user')
    }

    async delete(req: Request, res: Response) {
        return res.send()
    }
}

export default User;