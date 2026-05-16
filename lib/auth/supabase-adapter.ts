import type { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";
import { supabase } from "@/lib/supabase";

export function SupabaseAdapter(): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, "id">) {
      const { data, error } = await supabase
        .from("users")
        .insert({ email: user.email, name: user.name ?? null })
        .select()
        .single();
      if (error) throw error;
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified ? new Date(data.email_verified) : null,
        name: data.name,
      };
    },

    async getUser(id) {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single();
      if (!data) return null;
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified ? new Date(data.email_verified) : null,
        name: data.name,
      };
    },

    async getUserByEmail(email) {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();
      if (!data) return null;
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified ? new Date(data.email_verified) : null,
        name: data.name,
      };
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const { data: account } = await supabase
        .from("accounts")
        .select("user_id")
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId)
        .single();
      if (!account) return null;
      const { data: user } = await supabase
        .from("users")
        .select()
        .eq("id", account.user_id)
        .single();
      if (!user) return null;
      return {
        id: user.id,
        email: user.email,
        emailVerified: user.email_verified ? new Date(user.email_verified) : null,
        name: user.name,
      };
    },

    async updateUser(user) {
      const updates: Record<string, any> = {};
      if (user.name !== undefined) updates.name = user.name;
      if (user.emailVerified !== undefined)
        updates.email_verified = user.emailVerified
          ? user.emailVerified.toISOString()
          : null;

      // If nothing to update, just fetch and return the existing user
      if (Object.keys(updates).length === 0) {
        const { data } = await supabase
          .from("users")
          .select()
          .eq("id", user.id!)
          .single();
        if (!data) throw new Error("User not found");
        return {
          id: data.id,
          email: data.email,
          emailVerified: data.email_verified
            ? new Date(data.email_verified)
            : null,
          name: data.name,
        };
      }

      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id!)
        .select()
        .single();
      if (error) throw error;
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified
          ? new Date(data.email_verified)
          : null,
        name: data.name,
      };
    },

    async deleteUser(userId) {
      await supabase.from("users").delete().eq("id", userId);
    },

    async linkAccount(account: AdapterAccount) {
      await supabase.from("accounts").insert({
        user_id: account.userId,
        type: account.type,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
        refresh_token: account.refresh_token ?? null,
        access_token: account.access_token ?? null,
        expires_at: account.expires_at ?? null,
        token_type: account.token_type ?? null,
        scope: account.scope ?? null,
        id_token: account.id_token ?? null,
        session_state: (account.session_state as string) ?? null,
      });
    },

    async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      await supabase
        .from("accounts")
        .delete()
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId);
    },

    async createSession(session) {
      const { data, error } = await supabase
        .from("sessions")
        .insert({
          session_token: session.sessionToken,
          user_id: session.userId,
          expires: session.expires.toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return {
        sessionToken: data.session_token,
        userId: data.user_id,
        expires: new Date(data.expires),
      };
    },

    async getSessionAndUser(sessionToken) {
      const { data: session } = await supabase
        .from("sessions")
        .select()
        .eq("session_token", sessionToken)
        .single();
      if (!session) return null;
      const { data: user } = await supabase
        .from("users")
        .select()
        .eq("id", session.user_id)
        .single();
      if (!user) return null;
      return {
        session: {
          sessionToken: session.session_token,
          userId: session.user_id,
          expires: new Date(session.expires),
        },
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.email_verified ? new Date(user.email_verified) : null,
          name: user.name,
        },
      };
    },

    async updateSession(session) {
      const { data, error } = await supabase
        .from("sessions")
        .update({
          expires: session.expires
            ? session.expires.toISOString()
            : undefined,
        })
        .eq("session_token", session.sessionToken)
        .select()
        .single();
      if (error || !data) return null;
      return {
        sessionToken: data.session_token,
        userId: data.user_id,
        expires: new Date(data.expires),
      };
    },

    async deleteSession(sessionToken) {
      await supabase
        .from("sessions")
        .delete()
        .eq("session_token", sessionToken);
    },

    async createVerificationToken(token) {
      const { data, error } = await supabase
        .from("verification_tokens")
        .insert({
          identifier: token.identifier,
          token: token.token,
          expires: token.expires.toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return {
        identifier: data.identifier,
        token: data.token,
        expires: new Date(data.expires),
      };
    },

    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabase
        .from("verification_tokens")
        .delete()
        .eq("identifier", identifier)
        .eq("token", token)
        .select()
        .single();
      if (error || !data) return null;
      return {
        identifier: data.identifier,
        token: data.token,
        expires: new Date(data.expires),
      };
    },
  };
}
