import { FollowUpGrid } from "@/components/follow-up-grid";
import { Timeline } from "@/components/timeline/timeline";
import { useParams, useSearchParams } from "react-router-dom";

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

import { MeetingCard, MeetingData } from "@/components/meeting-card";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/empty-state";
import { useEffect } from "react";
import useRole from "@/hooks/auth/use-role";
import useUserId from "@/hooks/auth/use-user-id";
import { formatDate, translateProjectStatus } from "@/lib/utils";
import { FollowUpGridSkeleton } from "@/components/skeletons/follow-up-grid-skeleton";
import { EmptyStateSkeleton } from "@/components/skeletons/empty-state-skeleton";
import useSetProjectAsPaid from "@/hooks/api/useSetProjectAsPaid";
import { toast } from "sonner";
import Header from "@/components/header";
import useGetProjectFollowUp from "@/hooks/api/useGetProjectFollowUp";
import { Progress } from "@/types";
import { TimelineSkeleton } from "@/components/skeletons/timeline-skeleton";
import { RemoveFollowUpModal } from "@/components/follow-up/modals/remove-follow-up-modal";
import useGetProjectById from "@/hooks/api/useGetProjectById";
import useToken from "@/hooks/auth/use-token";
import useGetPaymentById from "@/hooks/api/useGetPaymentById";
import useGetAllMeetingsByProjectId from "@/hooks/api/useGetAllMeetingsByProjectId";

export default function FollowUp() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  const { setProjectAsPaid } = useSetProjectAsPaid();

  const role = useRole();
  const token = useToken();
  const userId = useUserId();

  const { project, getProjectLoading, getProjectById } = useGetProjectById({
    userType: role === "client" || role === "developer" ? role : "client",
  });

  const { followUp, getFollowUp, getFollowUpLoading } = useGetProjectFollowUp({
    userType: role === "client" || role === "developer" ? role : "client",
  });

  const { getPaymentById, getPaymentLoading, payment } = useGetPaymentById({
    userType: role === "client" || role === "developer" ? role : "client",
  });

  const { getMeetingsById, meetings } = useGetAllMeetingsByProjectId({
    userType: role === "client" || role === "developer" ? role : "client",
  });

  useEffect(() => {
    if (!userId || !id) return;

    if (role === "client") {
      getProjectById(userId, id);
    } else if (role === "developer" && token) {
      getProjectById(userId, id, token);
    }

    if (role === "client") {
      getPaymentById(userId, id);
    } else if (role === "developer" && token) {
      getPaymentById(userId, id, token);
    }

    if (role === "client") {
      getFollowUp(userId, id);
    } else if (role === "developer" && token) {
      getFollowUp(userId, id, token);
    }

    if (role === "client") {
      getMeetingsById(userId, id);
    } else if (role === "developer" && token) {
      getMeetingsById(userId, id, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, id]);

  useEffect(() => {
    if (!userId || !id) return;

    if (paymentId) {
      setProjectAsPaid({ paymentId })
        .then(() => {
          getPaymentById(userId, id);
        })
        .catch((error) => {
          toast.error("Erro ao finalizar pagamento.");
          console.error("Erro ao marcar pagamento como pago:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId]);

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
      description: "Veja sua lista de reuniões e participantes",
      icon: <Video className="h-4 w-4 text-purple-500" />,
      status: meetings
        ? `Mais recente: ${formatDate(meetings[meetings.length - 1].scheduledAt)}`
        : "",
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

  const formattedData =
    followUp && followUp.length > 0
      ? followUp.map((progress: Progress) => ({
          title: progress.title,
          content: (
            <div>
              {progress.descriptions.map((description, index) => (
                <p
                  key={index}
                  className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm"
                >
                  {description}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {progress.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Progress image ${index}`}
                    width={500}
                    height={500}
                    className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                  />
                ))}
              </div>

              <div className="absolute right-0 top-0">
                {role === "developer" && (
                  <RemoveFollowUpModal followUp={progress} key={progress.id} />
                )}
              </div>
            </div>
          ),
        }))
      : [];

  return (
    <div className="min-h-screen w-full">
      <Header />
      {role === null ? (
        <section className="mx-auto max-w-7xl px-4 py-20 pt-28">
          <EmptyState
            title="Entre na sua conta para continuar"
            description="Precisamos confirmar sua identidade antes de mostrar informações do projeto."
            icons={[FileText, AtSign, Files]}
            action="login"
          />
        </section>
      ) : (
        <>
          <section className="p-4 pb-20 pt-28">
            {getProjectLoading ? (
              <FollowUpGridSkeleton />
            ) : (
              <FollowUpGrid items={followUpGridStructureData} />
            )}
          </section>

          <Separator className="mx-auto w-full max-w-7xl" />

          {getPaymentLoading ? (
            <section className="mx-auto max-w-7xl px-4 py-20">
              <EmptyStateSkeleton className="" />
            </section>
          ) : (
            <>
              {payment && payment.paymentStatus === "pending" && (
                <section className="mx-auto max-w-7xl px-4 py-20">
                  <EmptyState
                    title="Pagamento Pendente"
                    description="Após o pagamento, é aqui onde você verá o progresso do desenvolvimento do seu projeto."
                    icons={[FileText, CircleDollarSign, Files]}
                    action="payment"
                    project={{
                      name: project?.title,
                      id: project?.id,
                      price: project?.price,
                      paymentId: project?.paymentId,
                    }}
                    plan={{
                      name: project?.planName,
                      id: project?.planId,
                      price: project?.planPrice,
                      period: project?.planPeriod,
                    }}
                  />
                </section>
              )}
            </>
          )}

          {project && project?.status === "PENDING" ? (
            <section className="mx-auto max-w-7xl px-4 py-20">
              <EmptyState
                title="Projeto Pendente"
                description="Após nossa conversa, é aqui onde você verá o progresso do desenvolvimento do seu projeto."
                icons={[FileText, Link, Files]}
                action="waiting"
              />
            </section>
          ) : (
            <>
              {payment && payment.paymentStatus === "paid" && (
                <>
                  {getFollowUpLoading ? (
                    <TimelineSkeleton />
                  ) : (
                    <Timeline data={formattedData} projectId={id as string} />
                  )}
                </>
              )}
            </>
          )}

          <Separator className="mx-auto w-full max-w-7xl px-4" />

          <section
            className="mx-auto max-w-7xl bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:4px_4px] px-4 pt-20 dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)]"
            id="meetings"
          >
            <div className="mx-auto mb-4 max-w-7xl">
              <h2 className="mb-4 max-w-4xl text-2xl font-medium dark:text-white md:text-3xl">
                Suas reuniões
              </h2>
              <p className="max-w-sm text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
                Veja seu histórico, ou solicite uma nova reunião.
              </p>
            </div>
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 lg:grid-cols-3">
              {meetings &&
                meetings.map((meeting: MeetingData) => {
                  return <MeetingCard key={meeting.id} meeting={meeting} />;
                })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
