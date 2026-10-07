/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: "/blog/how-to-improve-handwriting",
        destination: "/blog/how-to-improve-handwriting-as-an-adult",
        permanent: true,
      },
      {
        source: "/blog/cursive-vs-print",
        destination: "/blog/cursive-handwriting-practice-sheets",
        permanent: true,
      },
      {
        source: "/blog/how-to-improve-your-handwriting-as-an-adult",
        destination: "/blog/how-to-improve-handwriting-as-an-adult",
        permanent: true,
      },
      {
        source: "/tools/handwriting-worksheet-maker",
        destination: "/tools/handwriting-worksheet-creator",
        permanent: true,
      },
      {
        source: "/tools/cursive-worksheet-generator",
        destination: "/tools/cursive-practice-sheets",
        permanent: true,
      },
      {
        source: "/tools/custom-handwriting-worksheets",
        destination: "/tools/printable-handwriting-worksheets",
        permanent: true,
      },
      {
        source: "/tools/alphabet-tracing-worksheets",
        destination: "/tools/alphabet-tracing-generator",
        permanent: true,
      },
      {
        source: "/tools/sentence-tracing-worksheets",
        destination: "/tools/sentence-tracing-generator",
        permanent: true,
      },
      {
        source: "/tools/name-tracing-worksheets",
        destination: "/tools/name-tracing-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
