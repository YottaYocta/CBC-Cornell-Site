import { MailIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PersonRowProps {
  role: ReactNode;
  name: string;
  email?: string;
}

export default function PersonRow({ role, name, email }: PersonRowProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b border-b-neutral-300 border-dashed pb-2`}
    >
      <div className="w-full flex gap-2 sm:gap-8 items-start">
        <p className="flex-1 flex-shrink-0">{role}</p>
        {email ? (
          <a
            href={`mailto:${email}`}
            className={`w-min flex justify-start gap-1.5 items-center flex-1 text-nowrap flex-shrink-0 cursor-pointer hover:no-underline underline group`}
          >
            {name}
            <MailIcon
              width={14}
              height={14}
              className="group-hover:scale-125 transition"
            ></MailIcon>
          </a>
        ) : (
          <p className="flex-1 text-nowrap flex-shrink-0">{name}</p>
        )}
      </div>
    </div>
  );
}
