import LinkedInStylizer from '@/components/LinkedInStylizer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-body text-foreground">
      <div className="container mx-auto flex flex-col items-center p-4 pt-12 text-center md:pt-20">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          LinkedIn Stylizer
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Create eye-catching LinkedIn posts with custom text styles. Write your content, apply styles to selected text, and copy the result.
        </p>
      </div>
      <LinkedInStylizer />
    </main>
  );
}
