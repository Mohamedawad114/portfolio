import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEmailData } from 'src/common/Interfaces';
import { PinoLogger } from 'nestjs-pino';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailServices implements IEmailData {
  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  sendEmail = async (to: string, subject: string, html: string) => {
    try {
      const info = await this.mailerService.sendMail({
        from: `"ChatAI" <${this.configService.get<string>('BREVO_USER')}>`,
        to,
        subject,
        html,
      });
      this.logger.info(info.response);
    } catch (error) {
      this.logger.error(error);
    }
  };

  sendMessage = async (data: {
    email: string;
    subject: string;
    name: string;
    message: string;
  }) => {
    const { email, subject, name, message } = data;
    const html = `
    <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">

      <div style="background-color: #1a1a1a; padding: 20px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">رسالة جديدة من البورتفوليو 📨</h2>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px;">لقد تلقيت رسالة جديدة من <strong>${name}</strong>، إليك التفاصيل:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>الاسم:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>البريد الإلكتروني:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
          <p style="margin: 5px 0;"><strong>الموضوع:</strong> ${subject}</p>
        </div>

        <div style="border-right: 4px solid #1a1a1a; padding-right: 15px; margin-top: 20px;">
          <p style="font-weight: bold; margin-bottom: 10px;">نص الرسالة:</p>
          <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
      <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        تم إرسال هذه الرسالة عبر نموذج الاتصال في موقعك الشخصي.
      </div>
    </div>
    `;
    await this.sendEmail(
      this.configService.get<string>('MY_GMAIL') as string,
      `رسالة جديدة: ${subject}`,
      html,
    );
  };
}
