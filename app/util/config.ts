import { z } from 'zod';

const ConfigSchema = z.object({
  port: z.number().int().positive(),
  nodeEnv: z.enum(['development', 'test', 'production']),
  jwtSecret: z.string().min(32),
});

type ConfigType = z.infer<typeof ConfigSchema>;

class Config {
  private static instance: Config | null = null;
  private config: ConfigType;

  private constructor() {

    const parsedConfig = ConfigSchema.safeParse({
      port: Number.parseInt(Bun.env.PORT || '3000', 10),
      nodeEnv: Bun.env.NODE_ENV || 'development',
      jwtSecret: Bun.env.JWT_SECRET,
    });

    if (!parsedConfig.success) {
      console.error('Error de configuración:', parsedConfig.error.format());
      throw new Error('Configuración inválida. Verifica tus variables de entorno.');
    }

    this.config = parsedConfig.data;

    Object.freeze(this.config);
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public getConfig(): ConfigType {
    return this.config;
  }

  public get<K extends keyof ConfigType>(key: K): ConfigType[K] {
    return this.config[key];
  }
}

export default Config;