import useUserName from "@/hooks/auth/use-user-name";
import { WavesBackground } from "./waves-background";
import { CalendarSearchIcon, CogIcon, RefreshCwIcon } from "lucide-react";
import useToken from "@/hooks/auth/use-token";
import useGetAllProjectsDeveloper from "@/hooks/api/useGetAllProjectsDeveloper";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { Meeting, Project } from "@/types";
import useUserId from "@/hooks/auth/use-user-id";
import useGetAllDeveloperMeetings from "@/hooks/api/useGetAllDeveloperMeetings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Calendar from "./calendar";
import { EditProfileModal } from "./modals/edit-profile-modal";

export default function DevDashboard() {
  const [meetingsViewModel, setMeetingsViewModel] = useState<
    "calendar" | "list"
  >("list");

  const name = useUserName();
  const developerId = useUserId();
  const token = useToken();

  const { getAllProjectsDeveloper, projects, pagination, setPagination } =
    useGetAllProjectsDeveloper();
  const { getAllMeetings, meetings, meetingPagination, setMeetingPagination } =
    useGetAllDeveloperMeetings();

  useEffect(() => {
    getAllProjectsDeveloper({ token, developerId });
    getAllMeetings({ token, developerId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRefreshProjects() {
    getAllProjectsDeveloper({ token });
  }

  function handleRefreshMeetings() {
    getAllMeetings({ token, developerId });
  }

  return (
    <div className="max-sm:mt-14 sm:ml-14">
      <section className="relative h-[260px] w-full overflow-hidden rounded-lg bg-background/80">
        <div className="absolute inset-0">
          <WavesBackground
            lineColor={"rgba(0, 0, 0, 0.3)"}
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>

        <div className="absolute bottom-0 left-0 z-10 w-max rounded-sm border bg-white p-4">
          <h3 className="text-2xl font-bold">Bem-vindo(a) {name}</h3>
          <p className="text-muted-foreground">
            Aqui você poderá acompanhar os projetos dos quais faz parte, e
            também consultar datas de reuniões.
          </p>
        </div>

        <div className="absolute bottom-4 right-4">
          <EditProfileModal developerId={developerId as unknown as string} />
        </div>
      </section>

      <section className="flex gap-4 p-4 max-md:flex-col" id="projects">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Projetos
              </CardTitle>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshProjects}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <CogIcon className="ml-auto size-4" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {projects?._embedded?.developerProjectResponseDTOList?.length ? (
              <DataTable<Project>
                columns={columns<Project>("project")}
                filterPlaceholder="Filtre pelo nome do projeto"
                filterKey="title"
                entityName="project"
                data={projects._embedded.developerProjectResponseDTOList}
                pagination={pagination}
                setPagination={setPagination}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                Nenhum projeto disponível.
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4 p-4" id="meetings">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Reuniões
              </CardTitle>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshMeetings}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <CalendarSearchIcon className="ml-auto size-4" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select
              onValueChange={(value: "calendar" | "list") => {
                setMeetingsViewModel(value);
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione a visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Visualização</SelectLabel>
                  <SelectItem value="calendar">Calendário</SelectItem>

                  <SelectItem value="list">Lista</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {meetings?._embedded?.meetingResponseDTOList?.length && (
              <>
                {meetingsViewModel === "calendar" ? (
                  <Calendar
                    events={meetings?._embedded?.meetingResponseDTOList}
                  />
                ) : (
                  <DataTable<Meeting>
                    columns={columns<Meeting>("meeting")}
                    filterPlaceholder="Filtre por cliente"
                    filterKey="clientName"
                    entityName="meeting"
                    data={meetings?._embedded?.meetingResponseDTOList}
                    pagination={meetingPagination}
                    setPagination={setMeetingPagination}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
