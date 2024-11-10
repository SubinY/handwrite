import { ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Card({
  title,
  href,
  description,
  demo,
  large,
}: {
  title: string;
  href: string;
  description: string;
  demo?: ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`relative col-span-1 py-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      {demo ? (
        <div className="flex h-60 items-center justify-center">{demo}</div>
      ) : (
        <></>
      )}
      <div className="mx-auto max-w-md text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Link
            href={href}
            rel="noreferrer"
          >
            <Balancer className="text-decoration-underline">{title}</Balancer>
          </Link>
        </h2>
        <div className="prose-sm mt-2 leading-normal text-gray-500 md:prose whitespace-pre-wrap">
          <Balancer>
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    rel="noopener noreferrer"
                    {...props}
                    className="font-medium text-gray-800 underline transition-colors"
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    {...props}
                    // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                    inline="true"
                    className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </Balancer>
        </div>
      </div>
    </div>
  );
}
