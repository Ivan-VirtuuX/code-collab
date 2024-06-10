export const stackIcons = [
  {
    id: 10,
    name: "html",
    icon: "/img/StackIcons/html.png",
  },
  {
    id: 9,
    name: "css",
    icon: "/img/StackIcons/css.png",
  },
  {
    id: 12,
    name: "javascript",
    icon: "/img/StackIcons/javascript.png",
  },
  {
    id: 3,
    name: "typescript",
    icon: "/img/StackIcons/typescript.png",
  },

  {
    id: 1,
    name: "react",
    icon: "/img/StackIcons/react.png",
  },
  {
    id: 2,
    name: "nextjs",
    icon: "/img/StackIcons/nextjs.png",
  },
  {
    id: 11,
    name: "angular",
    icon: "/img/StackIcons/angular.png",
  },
  {
    id: 29,
    name: "vuejs",
    icon: "/img/StackIcons/vuejs.png",
  },
  {
    id: 4,
    name: "nodejs",
    icon: "/img/StackIcons/nodejs.png",
  },
  {
    id: 16,
    name: "expressjs",
    icon: "/img/StackIcons/expressjs.png",
  },
  {
    id: 21,
    name: "nestjs",
    icon: "/img/StackIcons/nestjs.png",
  },
  {
    id: 5,
    name: "mongodb",
    icon: "/img/StackIcons/mongodb.png",
  },
  {
    id: 20,
    name: "mysql",
    icon: "/img/StackIcons/mysql.png",
  },
  {
    id: 23,
    name: "postgresql",
    icon: "/img/StackIcons/postgresql.png",
  },
  {
    id: 6,
    name: "docker",
    icon: "/img/StackIcons/docker.png",
  },
  {
    id: 8,
    name: "babel",
    icon: "/img/StackIcons/babel.png",
  },
  {
    id: 28,
    name: "webpack",
    icon: "/img/StackIcons/webpack.png",
  },
  {
    id: 14,
    name: "python",
    icon: "/img/StackIcons/python.png",
  },
  {
    id: 13,
    name: "django",
    icon: "/img/StackIcons/django.png",
  },
  {
    id: 15,
    name: "dotnet",
    icon: "/img/StackIcons/dotnet.png",
  },
  {
    id: 31,
    name: "csharp",
    icon: "/img/StackIcons/csharp.png",
  },
  {
    id: 32,
    name: "cpp",
    icon: "/img/StackIcons/cpp.png",
  },
  {
    id: 33,
    name: "c",
    icon: "/img/StackIcons/c.png",
  },
  {
    id: 34,
    name: "kotlin",
    icon: "/img/StackIcons/kotlin.png",
  },
  {
    id: 35,
    name: "flutter",
    icon: "/img/StackIcons/flutter.png",
  },
  {
    id: 36,
    name: "yarn",
    icon: "/img/StackIcons/yarn.png",
  },
  {
    id: 37,
    name: "vscode",
    icon: "/img/StackIcons/vscode.png",
  },
  {
    id: 38,
    name: "webstorm",
    icon: "/img/StackIcons/webstorm.png",
  },
  {
    id: 39,
    name: "aws",
    icon: "/img/StackIcons/aws.png",
  },
  {
    id: 40,
    name: "android",
    icon: "/img/StackIcons/android.png",
  },
  {
    id: 41,
    name: "apple",
    icon: "/img/StackIcons/apple.png",
  },
  {
    id: 42,
    name: "rust",
    icon: "/img/StackIcons/rust.png",
  },
  {
    id: 43,
    name: "eslint",
    icon: "/img/StackIcons/eslint.png",
  },
  {
    id: 44,
    name: "graphql",
    icon: "/img/StackIcons/graphql.png",
  },
  {
    id: 45,
    name: "npm",
    icon: "/img/StackIcons/npm.png",
  },
  {
    id: 17,
    name: "go",
    icon: "/img/StackIcons/go.png",
  },
  {
    id: 18,
    name: "java",
    icon: "/img/StackIcons/java.png",
  },
  {
    id: 26,
    name: "spring",
    icon: "/img/StackIcons/spring.png",
  },
  {
    id: 19,
    name: "laravel",
    icon: "/img/StackIcons/laravel.png",
  },
  {
    id: 22,
    name: "php",
    icon: "/img/StackIcons/php.png",
  },
  {
    id: 24,
    name: "ruby",
    icon: "/img/StackIcons/ruby.png",
  },
  {
    id: 25,
    name: "rubyonrails",
    icon: "/img/StackIcons/rubyonrails.png",
  },
  {
    id: 27,
    name: "swift",
    icon: "/img/StackIcons/swift.png",
  },

  {
    id: 30,
    name: "figma",
    icon: "/img/StackIcons/figma.png",
  },
  {
    id: 7,
    name: "github",
    icon: "/img/StackIcons/github.png",
  },
];

export const getStackIcon = (name: string) => {
  return stackIcons.find((icon) => icon.name === name)?.icon;
};
