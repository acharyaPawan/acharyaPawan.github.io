import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold uppercase tracking-[0.15em]">
        Welcome
      </h1>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        I am a student, a fullstack developer. I like building web application.
        I enjoy coding. I find building interactive system with streaming,
        realtime system to be most fun.I am planning on exploring distributed
        system, and excelling microservice based architecuture.
      </p>
      <div className="my-8">
        <BlogPosts variant="home" />
      </div>
    </section>
  );
}
