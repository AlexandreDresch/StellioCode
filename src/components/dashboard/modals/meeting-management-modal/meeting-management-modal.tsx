import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  CalendarSyncIcon,
  LoaderCircleIcon,
  PenIcon,
  PenOffIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editEventSchema } from "@/schemas/event-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Meeting } from "@/types";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  cn,
  formatDateToISO,
  getTimeFromDate,
  setTimeInISODate,
} from "@/lib/utils";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import MeetingDetails from "./meeting-details";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useUpdateMeetingStatus from "@/hooks/api/useUpdateMeetingStatus";
import { Input } from "@/components/ui/input";
import useUpdateMeetingDate from "@/hooks/api/useUpdateMeetingDate";

export function MeetingManagementModal({ event }: { event: Meeting }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<z.infer<typeof editEventSchema>>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      status: event.status.toLowerCase() as Meeting["status"],
      date: event.scheduledAt,
      time: getTimeFromDate(event.scheduledAt as unknown as string),
    },
  });

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTczOTgzNjA3MSwiZXhwIjoxNzM5ODcyMDcxLCJyb2xlIjoiYWRtaW4ifQ.IsY6n0RTdoa9OmlqJejWVt6LOwA1LkBg2Kru6pXbcos";

  const { updateMeetingStatus, updatedMeeting, updateMeetingLoading } =
    useUpdateMeetingStatus();
  const { updateMeetingDate, updatedMeetingDate, updateMeetingDateLoading } =
    useUpdateMeetingDate();

  function onSubmit(values: z.infer<typeof editEventSchema>) {
    const date = formatDateToISO(values.date);
    const finalDate = setTimeInISODate(date, values.time);

    const statusChanged = event.status !== values.status;
    const dateChanged = (event.scheduledAt as unknown as string) !== finalDate;

    if (statusChanged && dateChanged) {
      Promise.all([
        updateMeetingStatus({
          meetingId: event.id,
          status: values.status.toUpperCase(),
          token,
        }),
        updateMeetingDate({
          meetingId: event.id,
          date: finalDate,
          token,
        }),
      ]).then(() => {
        setIsEditOpen(false);
      });
    } else if (statusChanged) {
      updateMeetingStatus({
        meetingId: event.id,
        status: values.status.toUpperCase(),
        token,
      }).then(() => {
        setIsEditOpen(false);
      });
    } else if (dateChanged) {
      updateMeetingDate({
        meetingId: event.id,
        date: finalDate,
        token,
      }).then(() => {
        setIsEditOpen(false);
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>Gerenciar</span>
        <CalendarSyncIcon size={14} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reunião com {event.clientName}</DialogTitle>
          <DialogDescription>
            Faça alterações em Abrir/Fechar Edição. Clique em Salvar Alterações
            quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <MeetingDetails
          client={event.clientName}
          date={
            updatedMeetingDate?.scheduledAt
              ? updatedMeetingDate.scheduledAt
              : event.scheduledAt
          }
          status={
            updatedMeeting?.status
              ? (updatedMeeting.status.toLowerCase() as Meeting["status"])
              : (event.status.toLowerCase() as Meeting["status"])
          }
        />

        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Descrição do Projeto</Label>
          <Textarea value={event.projectDescription} readOnly />
        </div>

        {isEditOpen && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toLowerCase()}
                        disabled={
                          updateMeetingLoading || updateMeetingDateLoading
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="accepted">Aprovada</SelectItem>
                          <SelectItem value="rejected">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Dia da Reunião</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                          disabled={
                            updateMeetingLoading || updateMeetingDateLoading
                          }
                        >
                          <CalendarIcon className="mr-2" />
                          {field.value ? (
                            format(field.value.toString(), "PPP", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione um dia</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex w-full flex-col space-y-2 p-2">
                        <Select
                          onValueChange={(value) => {
                            const newDate =
                              value === "today"
                                ? new Date()
                                : value === "tomorrow"
                                  ? addDays(new Date(), 1)
                                  : value === "in_3_days"
                                    ? addDays(new Date(), 3)
                                    : value === "in_7_days"
                                      ? addDays(new Date(), 7)
                                      : null;
                            if (newDate) {
                              field.onChange(newDate);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Atalhos" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="today">Hoje</SelectItem>
                            <SelectItem value="tomorrow">Amanhã</SelectItem>
                            <SelectItem value="in_3_days">Em 3 dias</SelectItem>
                            <SelectItem value="in_7_days">
                              Em uma semana
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            locale={ptBR}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Hora da Reunião</FormLabel>
                    <Input
                      aria-label="Time"
                      type="time"
                      {...field}
                      disabled={
                        updateMeetingLoading || updateMeetingDateLoading
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={updateMeetingLoading || updateMeetingDateLoading}
                  className="min-w-36"
                >
                  {" "}
                  {updateMeetingLoading || updateMeetingDateLoading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <span>Salvar Alterações</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        <Button
          onClick={() => setIsEditOpen(!isEditOpen)}
          variant="ghost"
          disabled={updateMeetingLoading || updateMeetingDateLoading}
        >
          <span>{isEditOpen ? "Fechar" : "Abrir"} Edição</span>
          {isEditOpen ? <PenOffIcon size={10} /> : <PenIcon size={10} />}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
