const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

gulp.task("styles", () => {
    return gulp
        .src("scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("main.css"))
        .pipe(gulp.dest("static/"));
});

gulp.task("scripts", () => {
    return gulp
        .src("js/**/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest("static/"));
});

gulp.task(
    "default",
    gulp.series(["styles", "scripts"], function (cb) {
        gulp.watch("scss/**/*.scss", gulp.series("styles"));
        gulp.watch("js/**/*.js", gulp.series("scripts"));

        cb();
    })
);
