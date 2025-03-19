import type { Request, Response } from "express";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

//Using Promise<any> because of No overload matches this call in the router.

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    const userSearch = await User.findOne({ email: body.email });
    if (userSearch) {
      res.status(400).json({ message: "Email existente" });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado con exito" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales invalidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Credenciales invalidas" });
    }
    const access_token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!!,
      { expiresIn: "1h" }
    );
    res.status(200).json({ data: access_token, message: "Login exitoso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export { register, login };
