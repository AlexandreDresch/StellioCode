import { FollowUpGrid } from "@/components/follow-up-grid";
import { Timeline } from "@/components/timeline/timeline";
import { useParams } from "react-router-dom";

import {
  CheckCircle,
  TrendingUp,
  Globe,
  Video,
  FileText,
  Link,
  Files,
  CircleDollarSign,
  AtSign,
} from "lucide-react";

import { MeetingCard } from "@/components/meeting-card";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/empty-state";
import { useEffect } from "react";
import useRole from "@/hooks/auth/use-role";
import useGetProjectByIdClient from "@/hooks/api/useGetProjectByIdClient";
import useUserId from "@/hooks/auth/use-user-id";
import { translateProjectStatus } from "@/lib/utils";
import { FollowUpGridSkeleton } from "@/components/skeletons/follow-up-grid-skeleton";

export default function FollowUp() {
  const { id } = useParams();

  const { getProjectByIdClient, project, getProjectLoading } =
    useGetProjectByIdClient();

  const role = useRole();
  const userId = useUserId();

  useEffect(() => {
    getProjectByIdClient({ clientId: userId, projectId: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, id]);

  const data = [
    {
      title: "20/12/2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Criada estrutura inicial do projeto
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "20/12/2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "20/12/2024",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Deployed 5 new components today
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Random file upload lol
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  const followUpGridStructureData = [
    {
      title: project?.title,
      type: project?.serviceName,
      description: project?.description,
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      status: translateProjectStatus(project?.status),
      clientName: project?.clientName,
      colSpan: 2,
      hasPersistentHover: true,
    },
    {
      title: "Serviço",
      id: project?.serviceId,
      type: project?.serviceName,
      description: project?.serviceDescription,
      icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      status: project?.servicePrice,
    },
    {
      title: "Reuniões",
      description: "Cloud storage with intelligent content processing",
      icon: <Video className="h-4 w-4 text-purple-500" />,
      status: "Próxima: 12/04/2025",
      colSpan: 2,
    },
    {
      title: "Plano",
      id: project?.planId,
      type: project?.planName,
      description: project?.planDescription,
      icon: <Globe className="h-4 w-4 text-sky-500" />,
      status: project?.planPeriod,
    },
  ];

  const mockMeeting = {
    id: "0f86773e-02f1-41c6-9bec-1e1d8686f948",
    status: "ACCEPTED",
    clientId: "2bf1653e-889d-4ace-bbbd-d4756dd39192",
    clientName: "John Client",
    projectId: "20c0158f-4263-4da6-bd75-397d5cdeaf71",
    projectName: "Website Development 5",
    projectDescription: "A website project with e-commerce functionality.",
    scheduledAt: "2025-02-01T14:00",
    participants: ["Alan", "Jose", "Cleber"],
  };

  return (
    <div className="min-h-screen w-full">
      {role === null ? (
        <section className="mx-auto max-w-7xl px-4 py-20">
          <EmptyState
            title="Entre na sua conta para continuar"
            description="Precisamos confirmar sua identidade antes de mostrar informações do projeto."
            icons={[FileText, AtSign, Files]}
            action="login"
          />
        </section>
      ) : (
        <>
          <section className="p-4 pb-20">
            {getProjectLoading ? (
              <FollowUpGridSkeleton />
            ) : (
              <FollowUpGrid items={followUpGridStructureData} />
            )}
          </section>

          <Separator className="mx-auto w-full max-w-7xl" />

          <section className="mx-auto max-w-7xl px-4 py-20">
            <EmptyState
              title="Reunião Inicial Pendente"
              description="Após nossa conversa, é aqui onde você verá o progresso do desenvolvimento do seu projeto."
              icons={[FileText, Link, Files]}
              action="waiting"
            />
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20">
            <EmptyState
              title="Pagamento Pendente"
              description="Após o pagamento, é aqui onde você verá o progresso do desenvolvimento do seu projeto."
              icons={[FileText, CircleDollarSign, Files]}
              action="payment"
            />
          </section>

          <Timeline data={data} />

          <Separator className="mx-auto w-full max-w-7xl px-4" />

          <section className="mx-auto max-w-7xl px-4 pt-20" id="meetings">
            <div className="mx-auto mb-4 max-w-7xl">
              <h2 className="mb-4 max-w-4xl text-2xl font-medium dark:text-white md:text-3xl">
                Suas reuniões
              </h2>
              <p className="max-w-sm text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
                Veja seu histórico, ou solicite uma nova reunião.
              </p>
            </div>
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 lg:grid-cols-3">
              <MeetingCard meeting={mockMeeting} />
              <MeetingCard meeting={mockMeeting} />
              <MeetingCard meeting={mockMeeting} />
              <MeetingCard meeting={mockMeeting} />
              <MeetingCard meeting={mockMeeting} />
              <MeetingCard meeting={mockMeeting} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
