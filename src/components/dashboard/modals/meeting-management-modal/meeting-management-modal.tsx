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
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import MeetingDetails from "./meeting-details";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function MeetingManagementModal({ event }: { event: Meeting }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<z.infer<typeof editEventSchema>>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      description: event.projectDescription,
      status: event.status,
      date: event.scheduledAt,
    },
  });

  function onSubmit(values: z.infer<typeof editEventSchema>) {
    console.log("Form values:", values);
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
            Faça alterações em Abrir/Fechar Edição.
            Clique em Salvar Alterações quando estiver pronto.
          </DialogDescription>
        </DialogHeader>

        <MeetingDetails
          client={event.clientName}
          date={event.scheduledAt}
          status={event.status}
        />

        {!isEditOpen && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Descrição do Projeto</Label>
            <Textarea value={event.projectDescription} readOnly />
          </div>
        )}

        {isEditOpen && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Projeto</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="approved">Aprovado</SelectItem>
                          <SelectItem value="rejected">Rejeitado</SelectItem>
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

              <DialogFooter>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        <Button onClick={() => setIsEditOpen(!isEditOpen)} variant="ghost">
          <span>{isEditOpen ? "Fechar" : "Abrir"} Edição</span>
          {isEditOpen ? <PenOffIcon size={10} /> : <PenIcon size={10} />}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
