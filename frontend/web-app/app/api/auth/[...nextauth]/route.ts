import NextAuth, {AuthOptions, NextAuthOptions} from "next-auth";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";
import {OAuthConfig} from "next-auth/providers";
import {JWT} from "next-auth/jwt";

export const authOptions: {
    session: { strategy: string }; callbacks: {
        jwt({
                token,
                profile,
                account,
                user
            }: { token: any; profile: any; account: any; user: any }): Promise<JWT>; session({
                                                                                                 session,
                                                                                                 token
                                                                                             }: { session: any; token: any }): Promise<void>
    }; providers: OAuthConfig<any>[]
} = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIdentityServer6({
            id: 'id-server',
            clientId: 'nextApp',
            clientSecret: 'secret',
            issuer: 'http://localhost:5000',
            authorization: {params: {scope: 'openid profile auctionApp'}},
            idToken: true
        })
    ],
    callbacks: {
        async jwt({token, profile,account}) {
            if(profile) {
                token.username = profile.username;
            }
            if(account) {
                token.access_token = account.access_token
            }
            return token;
        },
        async session({session, token}) {
            if(token) {
                session.user.username = token.username;
                return session;
            }
}
    }
}
const handler = NextAuth(authOptions as AuthOptions);
export {handler as GET, handler as POST}
