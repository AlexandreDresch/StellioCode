import { Calendar, Clock, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/ui/expandable-card";
import { cn, getEventStatusColor, translateEventStatus } from "@/lib/utils";
import { Meeting } from "@/types";
import { useWindowDimensions } from "@/hooks/use-window-dimensions";

interface MeetingData {
  id: string;
  status: string;
  clientName: string;
  projectName: string;
  projectDescription: string;
  participants: string[];
  scheduledAt: string;
}

interface MeetingCardProps {
  meeting: MeetingData;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const { screenWidth } = useWindowDimensions();

  const badgeColor = getEventStatusColor(
    meeting.status.toLowerCase() as Meeting["status"],
  );
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(meeting.scheduledAt));

  return (
    <Expandable
      expandDirection="both"
      expandBehavior="replace"
      initialDelay={0.2}
    >
      {() => (
        <ExpandableTrigger>
          <ExpandableCard
            className="relative w-full"
            collapsedSize={{
              width: screenWidth > 767 ? 380 : screenWidth - 45,
              height: 240,
            }}
            expandedSize={{
              width: screenWidth > 767 ? 380 : screenWidth - 45,
              height: 460,
            }}
            hoverToExpand={false}
            expandDelay={200}
            collapseDelay={500}
          >
            <ExpandableCardHeader className="p-1">
              <div className="flex-cw-full flex-col w-full justify-between">
                <div className="flex justify-between w-full">
                  <h3 className="text-lg font-medium tracking-wider dark:text-white">
                    {meeting.projectName}
                  </h3>

                  <Badge variant="outline" className="size-8">
                    <Calendar className="h-4 w-4" />
                  </Badge>
                </div>

                <Badge
                  variant="secondary"
                  className={cn(
                    "max-w-max rounded-lg text-white hover:text-black",
                    badgeColor,
                  )}
                >
                  <span>
                    {translateEventStatus(
                      meeting.status.toLowerCase() as Meeting["status"],
                    )}
                  </span>
                </Badge>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent className="p-1">
              <div className="mb-4 flex flex-col items-start justify-between">
                <ExpandableContent preset="blur-md">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                </ExpandableContent>
              </div>
              <ExpandableContent preset="blur-md" stagger staggerChildren={0.2}>
                <p className="mb-4 text-sm text-gray-700 dark:text-gray-200">
                  {meeting.projectDescription}
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 flex items-center text-sm font-medium text-gray-800 dark:text-gray-100">
                    <Users className="mr-2 h-4 w-4" />
                    Participantes:
                  </h4>
                  <div className="flex -space-x-2 overflow-hidden">
                    {meeting.participants.map((name, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="border-2 border-white dark:border-gray-800">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${name[0]}`}
                                alt={name}
                              />
                              <AvatarFallback>{name[0]}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex w-full items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{meeting.clientName}</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}
