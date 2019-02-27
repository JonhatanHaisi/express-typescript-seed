const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const mocha = require('gulp-mocha');
const merge = require('merge-stream');

const tsSourceProject = ts.createProject('tsconfig.json');
const tsTestProject = ts.createProject('tsconfig.test.json');

// TESTs TASKs
gulp.task('clean:test', done => {
    del.sync([ 'build/test' ]);
    done();
});

gulp.task('copy:static:test', gulp.series('clean:test', () => {
    return gulp.src([ 'src/**/*.json', 'src/**/*.js' ])
                .pipe(gulp.dest('build/test/src'));
}));


gulp.task('compile:test', gulp.series('copy:static:test', () => {
    const sources = tsTestProject.src().pipe(tsTestProject());
    return sources.js.pipe(gulp.dest('build/test'));
}));

gulp.task('build:test', gulp.series('compile:test'));

gulp.task('test:unit', () => {
    return gulp.src('./build/test/test/unit/**/*.test.js', { read: false })
                .pipe(mocha({ reporter: 'spec', exit: true }));
    
});

gulp.task('test:integration', () => {
    return gulp.src('./build/test/test/integration/**/*.test.js', { read: false })
                .pipe(mocha({ reporter: 'spec', exit: true }));
    
});

// SOURCE TASKs
gulp.task('clean:dist', done => {
    del.sync([ 'build/dist' ]);
    done();
});

gulp.task('copy:static', gulp.series('clean:dist', () => {
    return gulp.src([ 'src/**/*.json', 'src/**/*.js' ])
                .pipe(gulp.dest('build/dist'));
}));

gulp.task('compile:src', gulp.series('copy:static', () => {
    const sources = tsSourceProject.src().pipe(tsSourceProject());
    return sources.js.pipe(gulp.dest('build/dist'));
}));

gulp.task('build:src', gulp.series('compile:src'));

gulp.task('watch', gulp.series('build:src', () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.js', 'src/**/*.json'], gulp.series('build:src'))
                .on('change', (path, stats) => console.info(`Changed: ${path}`));
}));

// RELEASE
gulp.task('copy:sequelize:data', gulp.series('build:src', () => {
    return merge(
        gulp.src('./.sequelizerc').pipe(gulp.dest('./build/dist')),
        gulp.src([ './migrations/**/*.js' ]).pipe(gulp.dest('./build/dist/migrations')),
        gulp.src([ './package.json' ]).pipe(gulp.dest('./build/dist'))
    );
}));

gulp.task('release:gzip', gulp.series('copy:sequelize:data', () => {
    del.sync([ './release' ]);
    return gulp.src('./build/dist/**/*.*')
                .pipe(tar('dist.tar'))
                .pipe(gzip())
                .pipe(gulp.dest('./release'));
}));

// OTHERs TASKS
gulp.task('clean:all', done => {
    del.sync([ './build', './release', 'logs', 'report', '.nyc_output' ]);
    done();
});

