var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var fancy_log = require("fancy-log");
var ts = require("gulp-typescript");
var tsProjectTest = ts.createProject("tsconfig.json");
var mocha = require('gulp-mocha');
var paths = {
  pages: ["src/*.html"],
};
var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
gulp.task("test", function () {
  console.log("Test!");
  return tsProjectTest.src().pipe(tsProjectTest()).js.pipe(mocha())
  .on("error", function(err) {
      console.log(err);
  })
});
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
function bundle() {
  return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
}
gulp.task("default", gulp.series(gulp.parallel("copy-html"), bundle));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);