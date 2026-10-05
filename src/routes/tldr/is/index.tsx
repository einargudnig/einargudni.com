import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";

function IsPage() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          Hæhæ!
        </h1>
        <Image
          src="/images/avatar.jpeg"
          alt="Einar Gudni"
          width={150}
          height={150}
          className="rounded-full grayscale"
        />
      </div>

      <p className="flex max-w-md text-md text-foreground ">
        Ég er Einar! Ég er forritari og hef mikinn áhuga á nýjustu tækni. Ég er vanur að búa til
        veflausnir með React og TypeScript. Ég er lausnamiðaður og legg áherslu á góða
        notendaupplifun.
      </p>
      <p className="flex max-w-md text-md text-foreground ">
        Ég get hjálpað til við þróa veflausnir, setja upp kerfi, nýsmíði og uppfærslur.
      </p>
      <p className="flex max-w-md text-md text-foreground ">
        Ég hef unnið sem forritari síðan 2020, bæði hjá fyrirtækjum og sem sjálfstæður verktaki.
      </p>
      <p className="flex max-w-md text-md text-foreground ">
        Þú getur séð hvað ég hef verið að gera hér á þessari síðu eða haft samband við mig í gegnum
        netfangið einargudnig@gmail.com
      </p>
      <div className="flex justify-start">
        <Link href="/tldr/en" className="mr-2 p-2 -m-2">
          This page in English <span aria-hidden="true">🇬🇧</span>
        </Link>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/tldr/is/")({
  component: IsPage,
});
