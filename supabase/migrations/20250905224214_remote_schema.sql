drop extension if exists "pg_net";

grant delete on table "extensions"."wrappers_fdw_stats" to "anon";

grant insert on table "extensions"."wrappers_fdw_stats" to "anon";

grant references on table "extensions"."wrappers_fdw_stats" to "anon";

grant select on table "extensions"."wrappers_fdw_stats" to "anon";

grant trigger on table "extensions"."wrappers_fdw_stats" to "anon";

grant truncate on table "extensions"."wrappers_fdw_stats" to "anon";

grant update on table "extensions"."wrappers_fdw_stats" to "anon";

grant delete on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant insert on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant references on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant select on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant trigger on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant truncate on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant update on table "extensions"."wrappers_fdw_stats" to "authenticated";

grant delete on table "extensions"."wrappers_fdw_stats" to "service_role";

grant insert on table "extensions"."wrappers_fdw_stats" to "service_role";

grant references on table "extensions"."wrappers_fdw_stats" to "service_role";

grant select on table "extensions"."wrappers_fdw_stats" to "service_role";

grant trigger on table "extensions"."wrappers_fdw_stats" to "service_role";

grant truncate on table "extensions"."wrappers_fdw_stats" to "service_role";

grant update on table "extensions"."wrappers_fdw_stats" to "service_role";

drop policy "Users can create messages in their conversations." on "public"."messages";

drop policy "Users can view messages in their conversations." on "public"."messages";


  create table "public"."countries" (
    "id" uuid not null default gen_random_uuid(),
    "code" character varying(2) not null,
    "name" character varying(100) not null,
    "signalwire_country_code" character varying(2) not null,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."countries" enable row level security;


  create table "public"."signalwire_usage" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "subproject_id" character varying(100) not null,
    "usage_type" character varying(20) not null,
    "quantity" integer default 1,
    "cost_cents" integer default 0,
    "billing_period" date not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."signalwire_usage" enable row level security;


  create table "public"."trial_cleanup_queue" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "subproject_id" character varying(100) not null,
    "phone_number" character varying(20),
    "phone_sid" character varying(100),
    "cleanup_scheduled_for" timestamp with time zone not null,
    "status" character varying(20) default 'pending'::character varying,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."trial_cleanup_queue" enable row level security;


  create table "public"."user_profiles" (
    "id" uuid not null,
    "email" text not null,
    "full_name" text,
    "country_code" character varying(2) default 'US'::character varying,
    "signalwire_subproject_id" character varying(100),
    "signalwire_subproject_token" character varying(100),
    "trial_phone_number" character varying(20),
    "trial_phone_sid" character varying(100),
    "trial_expires_at" timestamp with time zone,
    "subscription_status" character varying(20) default 'trial'::character varying,
    "stripe_customer_id" character varying(100),
    "stripe_subscription_id" character varying(100),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."user_profiles" enable row level security;

alter table "public"."messages" drop column "sender";

alter table "public"."messages" add column "direction" character varying(10);

alter table "public"."messages" add column "message_status" character varying(20) default 'queued'::character varying;

alter table "public"."messages" add column "recipient_number" character varying(20);

alter table "public"."messages" add column "sender_number" character varying(20);

alter table "public"."messages" add column "sender_type" character varying(10);

alter table "public"."messages" add column "signalwire_message_sid" character varying(100);

alter table "public"."messages" add column "updated_at" timestamp with time zone default now();

alter table "public"."messages" alter column "id" set default gen_random_uuid();

CREATE UNIQUE INDEX countries_code_key ON public.countries USING btree (code);

CREATE UNIQUE INDEX countries_pkey ON public.countries USING btree (id);

CREATE INDEX idx_conversations_contact_number ON public.conversations USING btree (contact_number);

CREATE INDEX idx_countries_active ON public.countries USING btree (is_active);

CREATE INDEX idx_countries_code ON public.countries USING btree (code);

CREATE INDEX idx_messages_conversation_id ON public.messages USING btree (conversation_id);

CREATE INDEX idx_messages_signalwire_sid ON public.messages USING btree (signalwire_message_sid);

CREATE INDEX idx_signalwire_usage_billing_period ON public.signalwire_usage USING btree (billing_period);

CREATE INDEX idx_signalwire_usage_user_id ON public.signalwire_usage USING btree (user_id);

CREATE INDEX idx_trial_cleanup_status ON public.trial_cleanup_queue USING btree (status, cleanup_scheduled_for);

CREATE UNIQUE INDEX messages_signalwire_message_sid_key ON public.messages USING btree (signalwire_message_sid);

CREATE UNIQUE INDEX signalwire_usage_pkey ON public.signalwire_usage USING btree (id);

CREATE UNIQUE INDEX trial_cleanup_queue_pkey ON public.trial_cleanup_queue USING btree (id);

CREATE UNIQUE INDEX user_profiles_pkey ON public.user_profiles USING btree (id);

alter table "public"."countries" add constraint "countries_pkey" PRIMARY KEY using index "countries_pkey";

alter table "public"."signalwire_usage" add constraint "signalwire_usage_pkey" PRIMARY KEY using index "signalwire_usage_pkey";

alter table "public"."trial_cleanup_queue" add constraint "trial_cleanup_queue_pkey" PRIMARY KEY using index "trial_cleanup_queue_pkey";

alter table "public"."user_profiles" add constraint "user_profiles_pkey" PRIMARY KEY using index "user_profiles_pkey";

alter table "public"."countries" add constraint "countries_code_key" UNIQUE using index "countries_code_key";

alter table "public"."messages" add constraint "messages_direction_check" CHECK (((direction)::text = ANY ((ARRAY['inbound'::character varying, 'outbound'::character varying])::text[]))) not valid;

alter table "public"."messages" validate constraint "messages_direction_check";

alter table "public"."messages" add constraint "messages_sender_type_check" CHECK (((sender_type)::text = ANY ((ARRAY['contact'::character varying, 'ai'::character varying, 'user'::character varying])::text[]))) not valid;

alter table "public"."messages" validate constraint "messages_sender_type_check";

alter table "public"."messages" add constraint "messages_signalwire_message_sid_key" UNIQUE using index "messages_signalwire_message_sid_key";

alter table "public"."signalwire_usage" add constraint "signalwire_usage_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."signalwire_usage" validate constraint "signalwire_usage_user_id_fkey";

alter table "public"."trial_cleanup_queue" add constraint "trial_cleanup_queue_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."trial_cleanup_queue" validate constraint "trial_cleanup_queue_user_id_fkey";

alter table "public"."user_profiles" add constraint "fk_user_profiles_country" FOREIGN KEY (country_code) REFERENCES countries(code) not valid;

alter table "public"."user_profiles" validate constraint "fk_user_profiles_country";

alter table "public"."user_profiles" add constraint "user_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- function body …
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."countries" to "anon";

grant insert on table "public"."countries" to "anon";

grant references on table "public"."countries" to "anon";

grant select on table "public"."countries" to "anon";

grant trigger on table "public"."countries" to "anon";

grant truncate on table "public"."countries" to "anon";

grant update on table "public"."countries" to "anon";

grant delete on table "public"."countries" to "authenticated";

grant insert on table "public"."countries" to "authenticated";

grant references on table "public"."countries" to "authenticated";

grant select on table "public"."countries" to "authenticated";

grant trigger on table "public"."countries" to "authenticated";

grant truncate on table "public"."countries" to "authenticated";

grant update on table "public"."countries" to "authenticated";

grant delete on table "public"."countries" to "service_role";

grant insert on table "public"."countries" to "service_role";

grant references on table "public"."countries" to "service_role";

grant select on table "public"."countries" to "service_role";

grant trigger on table "public"."countries" to "service_role";

grant truncate on table "public"."countries" to "service_role";

grant update on table "public"."countries" to "service_role";

grant delete on table "public"."signalwire_usage" to "anon";

grant insert on table "public"."signalwire_usage" to "anon";

grant references on table "public"."signalwire_usage" to "anon";

grant select on table "public"."signalwire_usage" to "anon";

grant trigger on table "public"."signalwire_usage" to "anon";

grant truncate on table "public"."signalwire_usage" to "anon";

grant update on table "public"."signalwire_usage" to "anon";

grant delete on table "public"."signalwire_usage" to "authenticated";

grant insert on table "public"."signalwire_usage" to "authenticated";

grant references on table "public"."signalwire_usage" to "authenticated";

grant select on table "public"."signalwire_usage" to "authenticated";

grant trigger on table "public"."signalwire_usage" to "authenticated";

grant truncate on table "public"."signalwire_usage" to "authenticated";

grant update on table "public"."signalwire_usage" to "authenticated";

grant delete on table "public"."signalwire_usage" to "service_role";

grant insert on table "public"."signalwire_usage" to "service_role";

grant references on table "public"."signalwire_usage" to "service_role";

grant select on table "public"."signalwire_usage" to "service_role";

grant trigger on table "public"."signalwire_usage" to "service_role";

grant truncate on table "public"."signalwire_usage" to "service_role";

grant update on table "public"."signalwire_usage" to "service_role";

grant delete on table "public"."trial_cleanup_queue" to "anon";

grant insert on table "public"."trial_cleanup_queue" to "anon";

grant references on table "public"."trial_cleanup_queue" to "anon";

grant select on table "public"."trial_cleanup_queue" to "anon";

grant trigger on table "public"."trial_cleanup_queue" to "anon";

grant truncate on table "public"."trial_cleanup_queue" to "anon";

grant update on table "public"."trial_cleanup_queue" to "anon";

grant delete on table "public"."trial_cleanup_queue" to "authenticated";

grant insert on table "public"."trial_cleanup_queue" to "authenticated";

grant references on table "public"."trial_cleanup_queue" to "authenticated";

grant select on table "public"."trial_cleanup_queue" to "authenticated";

grant trigger on table "public"."trial_cleanup_queue" to "authenticated";

grant truncate on table "public"."trial_cleanup_queue" to "authenticated";

grant update on table "public"."trial_cleanup_queue" to "authenticated";

grant delete on table "public"."trial_cleanup_queue" to "service_role";

grant insert on table "public"."trial_cleanup_queue" to "service_role";

grant references on table "public"."trial_cleanup_queue" to "service_role";

grant select on table "public"."trial_cleanup_queue" to "service_role";

grant trigger on table "public"."trial_cleanup_queue" to "service_role";

grant truncate on table "public"."trial_cleanup_queue" to "service_role";

grant update on table "public"."trial_cleanup_queue" to "service_role";

grant delete on table "public"."user_profiles" to "anon";

grant insert on table "public"."user_profiles" to "anon";

grant references on table "public"."user_profiles" to "anon";

grant select on table "public"."user_profiles" to "anon";

grant trigger on table "public"."user_profiles" to "anon";

grant truncate on table "public"."user_profiles" to "anon";

grant update on table "public"."user_profiles" to "anon";

grant delete on table "public"."user_profiles" to "authenticated";

grant insert on table "public"."user_profiles" to "authenticated";

grant references on table "public"."user_profiles" to "authenticated";

grant select on table "public"."user_profiles" to "authenticated";

grant trigger on table "public"."user_profiles" to "authenticated";

grant truncate on table "public"."user_profiles" to "authenticated";

grant update on table "public"."user_profiles" to "authenticated";

grant delete on table "public"."user_profiles" to "service_role";

grant insert on table "public"."user_profiles" to "service_role";

grant references on table "public"."user_profiles" to "service_role";

grant select on table "public"."user_profiles" to "service_role";

grant trigger on table "public"."user_profiles" to "service_role";

grant truncate on table "public"."user_profiles" to "service_role";

grant update on table "public"."user_profiles" to "service_role";


  create policy "Users can view own conversations"
  on "public"."conversations"
  as permissive
  for all
  to public
using ((auth.uid() = user_id));



  create policy "Anyone can view active countries"
  on "public"."countries"
  as permissive
  for select
  to public
using ((is_active = true));



  create policy "Users can view own messages"
  on "public"."messages"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM conversations
  WHERE ((conversations.id = messages.conversation_id) AND (conversations.user_id = auth.uid())))));



  create policy "Users can view own usage"
  on "public"."signalwire_usage"
  as permissive
  for all
  to public
using ((auth.uid() = user_id));



  create policy "authenticated can select"
  on "public"."trial_cleanup_queue"
  as permissive
  for select
  to authenticated
using (true);



  create policy "service_role can delete"
  on "public"."trial_cleanup_queue"
  as permissive
  for delete
  to service_role
using (true);



  create policy "service_role can modify"
  on "public"."trial_cleanup_queue"
  as permissive
  for insert
  to service_role
with check (true);



  create policy "Users can update own profile"
  on "public"."user_profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view own profile"
  on "public"."user_profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



