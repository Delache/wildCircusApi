import { TokenService } from './token.service';
import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';
import { Token } from '../models/token';
import { UserService } from './user.service';

export class AuthService {

    private repository: UserRepository;
    private tokenService: TokenService;
    private userService: UserService;
    constructor() {
        this.repository = new UserRepository();
        this.tokenService = new TokenService();
        this.userService = new UserService();
    }

    async signUp(user: User) {
        const userEmail = await this.repository.findByEmail(user.email);
        if (userEmail == null || undefined) {
            user.password = await hash(user.password);
            randomBytes(12).toString('hex');
            const all = await this.repository.save(user);
            const tokenString = randomBytes(12).toString('hex');
            const token = new Token({user_id : all.insertId, value : tokenString});
            await this.tokenService.create(token);
            await this.nodemailer(tokenString, user);
        } else {
            throw new Error('Mail already used ');
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.repository.findByEmail(email);
        const error = new Error('Invalid credentials');
        if (user?.email_active === 0) {
            throw new Error('NOT_ACTIVE');
        }
        if (!user) {
            throw error;
        }
        const isValid = await verify(user.password, password);
        if (!isValid) {
            throw error;
        }

        const payload = {id: user.id, email: user.email, firstname: user.firstname, role: user.role};
        if (!process.env.WILD_JWT_SECRET) {
            throw new Error('Server is not correctly configured');
        }

        const token = sign(payload, process.env.WILD_JWT_SECRET as string);
        return {token, user};

    }

    async confirmation(tokenStr: string) {

       const token = await this.tokenService.getByValue(tokenStr);

       if (!token) {
           throw new Error('Lien invalide');
       }
       await this.userService.updateUser(token.user_id);
    }

    private async nodemailer(token: string, user: User) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Activation link', // Subject line
        html: `
        <a href="http://localhost:3000/auth/confirmation/${token}">Activation link</a>`, // html body
    });

    // tslint:disable-next-line: no-console
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // tslint:disable-next-line: no-console
    console.log('Preview URL: %s', getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

}
