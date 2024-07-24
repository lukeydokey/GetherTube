/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //   async rewrite() {
  //     return [
  //       {
  //         // localhost:9000의 api 요청할 때 /api/~~ 로작성하면 'http://localhost:9000/~~' 로 요청한 것과 동일하게 적용이 된다.
  //         source: "/api/:path*",
  //         // cors로 문제가 되었던 url 입력
  //         destination:
  //           "http://ec2-3-36-58-245.ap-northeast-2.compute.amazonaws.com:18080",
  //       },
  //     ];
  //   },
};

export default nextConfig;
