export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _notifications: {
        Row: {
          announcement_page_action_button: string | null;
          body: string | null;
          created_at: string;
          delivery_time: string;
          id: string;
          image_url: string | null;
          is_announcement: boolean | null;
          name: string;
          notification_type: string | null;
          send_at: string;
          subtitle: string | null;
          tag: string;
          title: string | null;
          vendor_id: string | null;
        };
        Insert: {
          announcement_page_action_button?: string | null;
          body?: string | null;
          created_at?: string;
          delivery_time: string;
          id?: string;
          image_url?: string | null;
          is_announcement?: boolean | null;
          name: string;
          notification_type?: string | null;
          send_at: string;
          subtitle?: string | null;
          tag: string;
          title?: string | null;
          vendor_id?: string | null;
        };
        Update: {
          announcement_page_action_button?: string | null;
          body?: string | null;
          created_at?: string;
          delivery_time?: string;
          id?: string;
          image_url?: string | null;
          is_announcement?: boolean | null;
          name?: string;
          notification_type?: string | null;
          send_at?: string;
          subtitle?: string | null;
          tag?: string;
          title?: string | null;
          vendor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: '_notifications_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: '_notifications_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors_with_average_ratings';
            referencedColumns: ['id'];
          },
        ];
      };
      _users: {
        Row: {
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_login: string | null;
          last_name: string | null;
          role: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_login?: string | null;
          last_name?: string | null;
          role?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_login?: string | null;
          last_name?: string | null;
          role?: string | null;
        };
        Relationships: [];
      };
      activations: {
        Row: {
          activated_at: string | null;
          created_at: string;
          id: string;
          member_id: string;
          metadata: Json | null;
          status: string | null;
          vendor_id: string;
        };
        Insert: {
          activated_at?: string | null;
          created_at?: string;
          id?: string;
          member_id?: string;
          metadata?: Json | null;
          status?: string | null;
          vendor_id?: string;
        };
        Update: {
          activated_at?: string | null;
          created_at?: string;
          id?: string;
          member_id?: string;
          metadata?: Json | null;
          status?: string | null;
          vendor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'activations_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activations_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activations_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors_with_average_ratings';
            referencedColumns: ['id'];
          },
        ];
      };
      bookmarks: {
        Row: {
          created_at: string;
          id: string;
          member_id: string | null;
          vendor_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          member_id?: string | null;
          vendor_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          member_id?: string | null;
          vendor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors_with_average_ratings';
            referencedColumns: ['id'];
          },
        ];
      };
      member_notifications: {
        Row: {
          created_at: string;
          id: string;
          member_id: string | null;
          notification_id: string | null;
          read: boolean | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          member_id?: string | null;
          notification_id?: string | null;
          read?: boolean | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          member_id?: string | null;
          notification_id?: string | null;
          read?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'member_notifications_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'member_notifications_notification_id_fkey';
            columns: ['notification_id'];
            isOneToOne: false;
            referencedRelation: '_notifications';
            referencedColumns: ['id'];
          },
        ];
      };
      member_rewards: {
        Row: {
          created_at: string;
          id: string;
          member_id: string;
          metadata: Json | null;
          reward_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          member_id: string;
          metadata?: Json | null;
          reward_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          member_id?: string;
          metadata?: Json | null;
          reward_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'member_bounties_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
        ];
      };
      member_subscriptions: {
        Row: {
          created_at: string;
          id: string;
          member_id: string | null;
          status: string | null;
          subscription_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          member_id?: string | null;
          status?: string | null;
          subscription_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          member_id?: string | null;
          status?: string | null;
          subscription_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'member_subscriptions_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: true;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
        ];
      };
      members: {
        Row: {
          address: Json | null;
          avatar_url: string | null;
          bio: string | null;
          birthday: string | null;
          created_at: string;
          delete_reasons: string[] | null;
          email: string | null;
          first_name: string | null;
          id: string;
          is_deleted: boolean | null;
          last_name: string | null;
          notification_prefs: Json;
          phone_number: Json | null;
          referral_code: string | null;
          reward_points: number;
        };
        Insert: {
          address?: Json | null;
          avatar_url?: string | null;
          bio?: string | null;
          birthday?: string | null;
          created_at?: string;
          delete_reasons?: string[] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          is_deleted?: boolean | null;
          last_name?: string | null;
          notification_prefs?: Json;
          phone_number?: Json | null;
          referral_code?: string | null;
          reward_points?: number;
        };
        Update: {
          address?: Json | null;
          avatar_url?: string | null;
          bio?: string | null;
          birthday?: string | null;
          created_at?: string;
          delete_reasons?: string[] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          is_deleted?: boolean | null;
          last_name?: string | null;
          notification_prefs?: Json;
          phone_number?: Json | null;
          referral_code?: string | null;
          reward_points?: number;
        };
        Relationships: [];
      };
      menus: {
        Row: {
          created_at: string;
          diet_type: string | null;
          featured: boolean | null;
          id: string;
          image_urls: string[] | null;
          info: string | null;
          meal_type: string | null;
          name: string | null;
          price: number | null;
          vendor_id: string;
        };
        Insert: {
          created_at?: string;
          diet_type?: string | null;
          featured?: boolean | null;
          id?: string;
          image_urls?: string[] | null;
          info?: string | null;
          meal_type?: string | null;
          name?: string | null;
          price?: number | null;
          vendor_id: string;
        };
        Update: {
          created_at?: string;
          diet_type?: string | null;
          featured?: boolean | null;
          id?: string;
          image_urls?: string[] | null;
          info?: string | null;
          meal_type?: string | null;
          name?: string | null;
          price?: number | null;
          vendor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'menus_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menus_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors_with_average_ratings';
            referencedColumns: ['id'];
          },
        ];
      };
      reviews: {
        Row: {
          created_at: string;
          food: number | null;
          free_text: Json | null;
          id: string;
          member_id: string;
          service: number | null;
          type: string | null;
          updated_at: string | null;
          vendor_id: string;
          vibes: number | null;
        };
        Insert: {
          created_at?: string;
          food?: number | null;
          free_text?: Json | null;
          id?: string;
          member_id?: string;
          service?: number | null;
          type?: string | null;
          updated_at?: string | null;
          vendor_id?: string;
          vibes?: number | null;
        };
        Update: {
          created_at?: string;
          food?: number | null;
          free_text?: Json | null;
          id?: string;
          member_id?: string;
          service?: number | null;
          type?: string | null;
          updated_at?: string | null;
          vendor_id?: string;
          vibes?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors_with_average_ratings';
            referencedColumns: ['id'];
          },
        ];
      };
      vendors: {
        Row: {
          address: Json | null;
          booking_urls: string[] | null;
          category: string[] | null;
          created_at: string;
          diet_options: string[] | null;
          eating_options: string[] | null;
          email: string | null;
          food_options: string[] | null;
          id: string;
          info: string | null;
          launch_sequence: Json | null;
          logo_url: string | null;
          name: string | null;
          phone_number: string | null;
          socials: Json | null;
          store_code: string | null;
          website_url: string | null;
        };
        Insert: {
          address?: Json | null;
          booking_urls?: string[] | null;
          category?: string[] | null;
          created_at?: string;
          diet_options?: string[] | null;
          eating_options?: string[] | null;
          email?: string | null;
          food_options?: string[] | null;
          id?: string;
          info?: string | null;
          launch_sequence?: Json | null;
          logo_url?: string | null;
          name?: string | null;
          phone_number?: string | null;
          socials?: Json | null;
          store_code?: string | null;
          website_url?: string | null;
        };
        Update: {
          address?: Json | null;
          booking_urls?: string[] | null;
          category?: string[] | null;
          created_at?: string;
          diet_options?: string[] | null;
          eating_options?: string[] | null;
          email?: string | null;
          food_options?: string[] | null;
          id?: string;
          info?: string | null;
          launch_sequence?: Json | null;
          logo_url?: string | null;
          name?: string | null;
          phone_number?: string | null;
          socials?: Json | null;
          store_code?: string | null;
          website_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      activated_vendors: {
        Row: {
          activated_at: string | null;
          created_at: string | null;
          id: string | null;
          member_id: string | null;
          metadata: Json | null;
          status: string | null;
          vendor_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'activations_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'members';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activations_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activations_vendor_id_fkey';
            columns: ['vendor_id'];
            isOneToOne: false;
            referencedRelation: 'vendors_with_average_ratings';
            referencedColumns: ['id'];
          },
        ];
      };
      vendors_with_average_ratings: {
        Row: {
          address: Json | null;
          average_food_rating: number | null;
          average_service_rating: number | null;
          average_vibes_rating: number | null;
          booking_urls: string[] | null;
          category: string[] | null;
          created_at: string | null;
          diet_options: string[] | null;
          eating_options: string[] | null;
          email: string | null;
          food_options: string[] | null;
          id: string | null;
          info: string | null;
          launch_sequence: Json | null;
          logo_url: string | null;
          name: string | null;
          phone_number: string | null;
          socials: Json | null;
          store_code: string | null;
          website_url: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      add_member_notifications: {
        Args: {
          member_ids: string;
          notification_id: string[];
        };
        Returns: undefined;
      };
      calculate_average_rating: {
        Args: {
          param_id: string;
        };
        Returns: {
          _vendor_id: string;
          average_food_rating: number;
          average_vibes_rating: number;
          average_service_rating: number;
        }[];
      };
      create_user_metadata: {
        Args: {
          email: string;
          password: string;
          user_meta_data: Json;
        };
        Returns: string;
      };
      decrement_reward_points: {
        Args: {
          points: number;
          member_id: string;
        };
        Returns: undefined;
      };
      get_activated_vendors: {
        Args: {
          param_id: string;
        };
        Returns: {
          like: unknown;
        }[];
      };
      increment_reward_points: {
        Args: {
          points: number;
          member_id: string;
        };
        Returns: undefined;
      };
      verify_user_password: {
        Args: {
          password: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
