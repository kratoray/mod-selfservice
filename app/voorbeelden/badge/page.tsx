'use client';

import Link from 'next/link';

import {
  AlertCircle,
  ArrowRight,
  BellRing,
  ChevronRight,
  ExternalLink,
  Info,
  Link as LinkIcon,
} from 'lucide-react';

import { Badge, badgeVariants } from '@/components/atoms/badge';
import { Separator } from '@/components/atoms/separator';
import { BreadcrumbNav } from '@/components/molecules/breadcrumb-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/card';
import { SidebarInset, SidebarTrigger } from '@/components/organisms/sidebar';
import { AppSidebar } from '@/components/templates/app-sidebar';

export default function BadgePage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="rounded-xl border bg-card text-card-foreground">
            <div className="p-8">
              <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight">Badge Component</h2>
                  <p className="text-muted-foreground">
                    Displays a badge or a component that looks like a badge.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standaard Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Badges als Link</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Link href="#" className={badgeVariants()}>
                        Default Link
                      </Link>
                      <Link href="#" className={badgeVariants({ variant: 'secondary' })}>
                        Secondary Link
                      </Link>
                      <Link href="#" className={badgeVariants({ variant: 'outline' })}>
                        Outline Link
                      </Link>
                      <Link href="#" className={badgeVariants({ variant: 'destructive' })}>
                        Destructive Link
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Badges met Icon aan Begin</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Badge icon={<Info size={12} />}>Info</Badge>
                      <Badge variant="secondary" icon={<BellRing size={12} />}>
                        Notification
                      </Badge>
                      <Badge variant="outline" icon={<ArrowRight size={12} />}>
                        Action
                      </Badge>
                      <Badge variant="destructive" icon={<AlertCircle size={12} />}>
                        Warning
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Badges met Icon aan Einde</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Badge icon={<Info size={12} />} iconPosition="end">
                        Info
                      </Badge>
                      <Badge variant="secondary" icon={<BellRing size={12} />} iconPosition="end">
                        Notification
                      </Badge>
                      <Badge variant="outline" icon={<ArrowRight size={12} />} iconPosition="end">
                        Action
                      </Badge>
                      <Badge
                        variant="destructive"
                        icon={<AlertCircle size={12} />}
                        iconPosition="end"
                      >
                        Warning
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Link Badges met Icons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Link href="#" className={badgeVariants()}>
                        <LinkIcon size={12} className="mr-1" />
                        Documentation
                      </Link>
                      <Link href="#" className={badgeVariants({ variant: 'secondary' })}>
                        GitHub
                        <ExternalLink size={12} className="ml-1" />
                      </Link>
                      <Link href="#" className={badgeVariants({ variant: 'outline' })}>
                        <LinkIcon size={12} className="mr-1" />
                        API Reference
                      </Link>
                      <Link href="#" className={badgeVariants({ variant: 'destructive' })}>
                        View Issues
                        <ChevronRight size={12} className="ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold">Badge Componenten</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Basis Gebruik</h3>
                      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
                        <code>{`import { Badge, badgeVariants } from '@/components/atoms/badge';
import { Icon } from 'lucide-react';

// Standaard badge
<Badge>Standaard</Badge>

// Met variant
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// Met icon
<Badge icon={<Icon size={12} />}>Met Icon</Badge>

// Met icon aan het einde
<Badge icon={<Icon size={12} />} iconPosition="end">Icon Einde</Badge>

// Als link gebruiken (met Next.js Link)
import Link from 'next/link';

<Link href="/route" className={badgeVariants()}>
  Link als Badge
</Link>

// Link met custom icon
<Link href="/route" className={badgeVariants()}>
  <Icon size={12} className="mr-1" />
  Documentation
</Link>`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Link href="/voorbeelden" className="text-primary underline">
                    Terug naar Voorbeelden
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
