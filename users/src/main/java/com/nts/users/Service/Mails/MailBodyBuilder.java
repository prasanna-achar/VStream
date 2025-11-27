package com.nts.users.Service.Mails;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailBodyBuilder {


    @Value("${FRONTEND_URL}")
    private String frontendLink;


    public  String buildVerificationEmail(String username, String otp) {
        // HTML email for OTP




        String htmlBody = "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                "<meta charset='UTF-8'/>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'/>" +
                "<title>Email Verification - VStream</title>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background: #f4f6f7; padding: 20px; }" +
                ".container { max-width: 520px; background: #ffffff; margin: auto; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }" +
                ".header { text-align: center; font-size: 30px; font-weight: bold; color: #ff4c4c; }" +
                ".otp { display: block; width: fit-content; margin: 20px auto; background: #ff4c4c; color: #fff; padding: 12px 28px; font-size: 32px; letter-spacing: 3px; border-radius: 8px; }" +
                ".footer { color: #555; font-size: 14px; margin-top: 25px; text-align: center; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>VStream</div>" +
                "<p>Hi <strong>" + username + "</strong>,</p>" +
                "<p>Thank you for registering on <strong>VStream</strong>! Please use the OTP below to verify your email address.</p>" +
                "<span class='otp'>" + otp + "</span>" +
                "<p>This OTP is valid for the next <strong>20 minutes</strong>.</p>" +
                "<p>If you didn't request this, please ignore the email.</p>" +
                "<div class='footer'>© " + new java.util.Date().getYear() + " VStream. All rights reserved.</div>" +
                "</div>" +
                "</body>" +
                "</html>"
                ;

        return htmlBody;
    }

    public  String buildResetPasswordEmail(String username, String token) {
        // Backend endpoint with token as path variable

        String resetLink = frontendLink + "/reset-password/"+token;

        return "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                "<meta charset='UTF-8' />" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0' />" +
                "<title>Password Reset - VStream</title>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background: #f7f9f9; padding: 20px; }" +
                ".container { max-width: 520px; background: #ffffff; margin: auto; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }" +
                ".header { text-align: center; font-size: 28px; font-weight: bold; color: #ff4c4c; }" +
                ".btn { display: inline-block; background: #ff4c4c; color: #ffffff; padding: 12px 28px; font-size: 18px; text-decoration: none; border-radius: 8px; margin-top: 20px; }" +
                ".footer { color: #777; font-size: 14px; text-align: center; margin-top: 25px; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>VStream</div>" +
                "<p>Hello <strong>" + username + "</strong>,</p>" +
                "<p>We received a request to reset the password for your VStream account.</p>" +
                "<p>Click the button below to reset your password:</p>" +
                "<div style='text-align:center;'>" +
                "<a href='" + resetLink + "' class='btn'>Reset Password</a>" +
                "</div>" +
                "<p style='margin-top:20px;'>This link will expire in <strong>20 minutes</strong>.</p>" +
                "<p>If you did not request a password reset, you can safely ignore this email.</p>" +
                "<div class='footer'>© " + new java.util.Date().getYear() + " VStream. All rights reserved.</div>" +
                "</div>" +
                "</body>" +
                "</html>"
                ;
    }

}

