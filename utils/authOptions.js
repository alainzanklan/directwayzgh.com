import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
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
    //Invoked on successfull signIn

    async signIn({ user }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exist
      const userExist = await User.findOne({ email: user.email });

      const email = user.email;

      const name = user.name;

      // 3. If not, then add user to the database
      if (!userExist) {
        await User.create({
          // Truncate user name if so long

          email,
          profile: {
            firstName: name,
          },
        });
      }
      // 4.Return true to allow sign in

      return true;
    },
    // modify session object
  },
};
