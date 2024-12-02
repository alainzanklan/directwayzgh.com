import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'USER',
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            return;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log('Error:', error);
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });

      session.user.id = user._id.toString();

      session.user.role = token.role;

      return session;
    },
    //Invoked on successfull signIn

    async signIn({ user }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exist
      const userExist = await User.findOne({ email: user.email });

      const email = user.email;

      const name = user.name;

      const role = user.role;

      // 3. If not, then add user to the database
      if (!userExist) {
        await User.create({
          // Truncate user name if so long

          email,
          profile: {
            firstName: name,
          },
          role,
        });
      }
      // 4.Return true to allow sign in

      return true;
    },

    // modify session object

    // async session({ session, user, token }) {
    //   if (user) {
    //     (session.user.name = token.name), (session.user.email = token.email);
    //     session.user.role = token.role;
    //   }
    // },
  },
};
