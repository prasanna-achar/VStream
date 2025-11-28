package com.nts.users.Utils;


import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ResendMailUtils {

    private Resend resend;


    public ResendMailUtils( @Value("${RESEND_API_KEY}")
                             String ResendAPIKey){
         this.resend = new Resend(ResendAPIKey);
    }

    public void sendMessage(String sendTo, String subject, String html){
        CreateEmailOptions mail = CreateEmailOptions.builder()
                .from("Acme <onboarding@resend.dev>")
                .to(sendTo)
                .subject(subject)
                .html(html).build();

        try {
            this.resend.emails().send(mail);
        }catch(ResendException re){
            re.printStackTrace();
            throw new RuntimeException("Failed to send mail");
        }
    }

}
