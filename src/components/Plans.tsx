import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Plans() {
  return (
    <div className="mb-24 mt-[40rem] block bg-[#5B1F83] lg:mt-64">
      <Tabs defaultValue="account" className="h-[500px] w-[1000px] py-20">
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-pink-500 to-sky-300">
          <TabsTrigger value="account" className="text-white">
            CONSTRUIR DO ZERO
          </TabsTrigger>
          <TabsTrigger value="password" className="text-white">
            REFAZENDO SEU PROJETO
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-col lg:flex-row">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>Plano light</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plano Padrão</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Saiba mais</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plano Premium</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
