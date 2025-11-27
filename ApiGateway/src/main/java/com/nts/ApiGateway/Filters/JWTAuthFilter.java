package com.nts.ApiGateway.Filters;

import com.nts.ApiGateway.Exceptions.UnauthorizedException;
import com.nts.ApiGateway.Utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Map;


@Component
public class JWTAuthFilter implements GlobalFilter, Ordered {



    private final JWTUtils jwtUtils;
    public JWTAuthFilter(JWTUtils jwtUtils){
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) throws UnauthorizedException{
        String path = exchange.getRequest().getURI().getPath();

        if (path.contains("/auth")) {
            return chain.filter(exchange);
        }



        String token = null;
        try{
            HttpCookie cookie = exchange.getRequest().getCookies().getFirst("jwt");
            if(cookie != null){
                token = cookie.getValue();
            }else {
                throw new UnauthorizedException("Unauthorized token");
            }
        }catch(UnauthorizedException ex){
            throw new RuntimeException();
        }


        if (token != null) {
            Map<String, Object> details = jwtUtils.validateAndExtract(token);

            System.out.println(details);

            if (!details.isEmpty()) {
                exchange = exchange.mutate()
                        .request(r -> r.headers(h -> {
                            h.add("X-User-Id", details.get("id").toString());
                            h.add("X-User-Email", details.get("email").toString());
                            h.add("X-User-Role", details.get("role").toString());
                            h.add("X-User-Name", details.get("username").toString());
                        }))
                        .build();
            }

            System.out.println(exchange.getRequest().getHeaders());
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}


