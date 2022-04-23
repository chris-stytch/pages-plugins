import type { MailChannelsOptions } from "./api";

interface Submission {
  request: Request;
  formData: FormData;
  name: string;
}

export type PluginArgs = {
  personalizations:
    | MailChannelsOptions["personalizations"]
    | ((submission: Submission) => MailChannelsOptions["personalizations"]);
  from:
    | MailChannelsOptions["from"]
    | ((submission: Submission) => MailChannelsOptions["from"]);
  subject?:
    | MailChannelsOptions["subject"]
    | ((submission: Submission) => MailChannelsOptions["subject"]);
  content?: (submission: Submission) => MailChannelsOptions["content"];
  respondWith: (submission: Submission) => Response | Promise<Response>;
};

export default function (args: PluginArgs): PagesFunction;
