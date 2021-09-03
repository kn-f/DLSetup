var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var stripDebug = require('gulp-strip-debug');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var mocha = require('gulp-mocha');
var paths = {
  pages: ["src/*.html"],
};

gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task("simple", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(stripDebug()).pipe(gulp.dest("dist"));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("copy-html"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/index.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("dist"));
  })
);

/*gulp.task("test", gulp.series("default", function() {
  return tsProjectTest.src().pipe(tsProjectTest()).js.pipe(mocha())
  .on("error", function(err) {
      console.log(err);
  });
}));*/

gulp.task('test', function () {
  return gulp.src('test/*.spec.ts')
    .pipe(mocha({
      // reporter: 'nyan',
      require: ['ts-node/register']
    }));
});

/* gulp.task('watch', ['default'], function() {
  gulp.watch('src/*.ts', ['default']);
});*/