export function adminToken(req,res,next){
    
    
    if (req.user['agent'].role == 'admin'){
    next()}
    else{
        res.status(400).json({msg: 'Acsess denaied'})
    }
}