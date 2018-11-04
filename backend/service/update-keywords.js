const path = require('path');
var Course = require(path.join(__dirname,'..','/models/course.js'));
var Rating = require(path.join(__dirname,'..','/models/ratings.js'));
var Professor = require(path.join(__dirname,'..','/models/professor.js'));

module.exports=function(req,res,next){
    // Course.find().then(function(courses) {
    //     courses.forEach(function(course) {
    //         var new_course = new Course({
    //             course_num: course.course_num,
    //             course_name: course.course_name,
    //             dept: course.dept,
    //             credits: course.credits,
    //             ger: course.ger,
    //             opus_id: course.opus_id,
    //             professors: course.professors,
    //             description: course.description,
    //             ratings:course.ratings
    //         });
    //         Course.remove({_id: course.id}, function(err) {

    //         });
    //         new_course.save();
    //         console.log(new_course.name);   
    //     });
    // });

    //WARNING: MESSING WITH DB iterate through all courses and add course_num+course_name keyword -- only run once
    
    Course.find().then(function(courses) {
      courses.forEach(function(course) {
        course.keywords.push(course.keywords[2]+' '+course.keywords[1]);
        course.keywords.push(course.course_num.replace( /[^\d.]/g, '' ))
        var set=new Set(course.keywords);
        course.keywords=Array.from(set);
        course.save();
      });
      console.log('course done')
    });
    
    //WARNING: MESSING WITH DB
    Professor.find().then(function(courses) {
      courses.forEach(function(course) {

        prof_name=course.name.replace(',','');
        course.keywords.push(prof_name);
        course.keywords.push(prof_name.replace('-',' '));
        course.keywords.push(prof_name.split(' ')[0]);
        course.keywords.push(prof_name.split(' ')[1]);
        var set=new Set(course.keywords);
        course.keywords=Array.from(set);
        console.log(course.keywords);
        course.save();
      });
      console.log('prof done')
    });
    res.json();
    console.log('done');
}