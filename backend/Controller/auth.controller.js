import User from '../Models/user.js';
import bcryptjs from  'bcryptjs';
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log('Received values:', username, email, password);
    if (!username || !email || !password) {
         res.status(209).json("please Give required fields")
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json(" this User already existed")
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.json({ message: 'Signup successful' });
    } catch (error) {
         res.status(500).json("Something went wrong")
    }
};


export const login =async(req,res,next)=>{
    const{email,password}=req.body;  
    if(!email||!password||email===''||password===''){
        res.status(404).json("please give all required fields");
    }
    try{
        const validuser=await User.findOne({email});
        if(!validuser){
          res.status(209).json("Invalid User");
        }
        const validpassword=bcryptjs.compareSync(password,validuser.password);
        if(!validpassword){
            res.status(400).json("Invalid password");
        }
        console.log("validuser",validuser);
        const {password:pass,...rest}=validuser._doc;
        res.status(200).cookie('access_token',{
            httpOnly:true,
        }).json(rest);
        console.log("user",validuser._doc);
    }catch(error){
        console.log("error");
        res.status(500).json(error);
    }
}