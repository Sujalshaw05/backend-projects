import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()
export async function getjob(params) {
   const [result] =  await pool.query('select * from Job');
   return result
// console.log()
}
export async function getcandidate(params){
const [result] = await pool.query('select * from Candidate');
    return [result];
}

export async function getaplicant(params){
const [result] = await pool.query('select * from Application');
 return [result];
}

 export async function insertaplicant(jobId,candidateId){
    const result=await pool.query(` INSERT INTO Application (jobId, candidateId)
VALUES (?, ?)
ON DUPLICATE KEY UPDATE appliedAt = NOW();
`,[jobId,candidateId]);
    return result;
}
 export async function insertcandidate(name,email,resumeLink){
    const result=await pool.query(`INSERT INTO Candidate (name, email, resumeLink)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE
name = VALUES(name),
resumeLink = VALUES(resumeLink);
`,[name,email,resumeLink]);
    return result;
}
 export async function insertjob(title,description,location){
    const result=await pool.query(`  INSERT INTO Job (title, description, location)  VALUES (?, ?, ?);`,[title,description,location]);
    return result;
}
let result= await insertjob('Frontend Developer', 'React.js role', 'Bangalore')
console.log(result);
result=await insertcandidate('prosenjit Shaw', 'prosenjit@example.com', 'https://resume.link')
console.log(result);
result = await insertaplicant(2,2)
console.log(result)
