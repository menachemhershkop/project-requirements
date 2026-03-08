export function adminToken(req,res,next){
    console.log(req.user);
    
    if (req.user['agent'].role == 'admin'){
    next()}
    else{
        res.status(400).json({msg: 'Acsess denaied'})
    }
}