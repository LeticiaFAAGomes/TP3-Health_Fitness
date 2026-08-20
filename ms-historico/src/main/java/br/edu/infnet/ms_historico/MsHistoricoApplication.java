package br.edu.infnet.ms_historico;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsHistoricoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsHistoricoApplication.class, args);
	}

}
