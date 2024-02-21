package com.smartform;

import java.util.HashMap;
import java.util.Map;

import org.camunda.bpm.application.PostDeploy;
import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.impl.ServletProcessApplication;
import org.camunda.bpm.engine.ProcessEngine;

/**
 * Process Application exposing this application's resources to the process engine.
 */
@ProcessApplication
public class SmartForm extends ServletProcessApplication {

  private static final String SMART_FORM_PROCESS_KEY = "smartform";

  /**
   * In a @PostDeploy Hook, you can interact with the process engine and access
   * the processes the application has deployed.
   */
  @PostDeploy
  public void onDeploymentFinished(ProcessEngine processEngine) {
	/**
	 * start an initial process instance
	 * here customerId : "fmpcommonspace@gmail.com" and
	 * data: {"fieldTypes": ["String", "Email", "Float", "Byte", "Match", "No Match"]}
	 * are static,and we have to change the Bearer token after 24 hours.
	 */
//   Map<String, Object> variables = new HashMap<>();
//    variables.put("customerId", "fmpcommonspace@gmail.com");
//    variables.put("data", "{\"fieldTypes\": [\"String\", \"Email\", \"Float\", \"Byte\", \"Match\", \"No Match\"]}");
//    variables.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmbXBjb21tb25zcGFjZUBnbWFpbC5jb20iLCJpYXQiOjE3MDMyMzU5MTcsImV4cCI6MTcwMzMyMjMxN30.mra1MC4bSBl5IgPjHgwVo7Mh0yBHGPiT2Pq1sW1n2s9m7Cv0BtYBQrlgeWw5mWBMuk_zdT7QwJ4fY-SC0EtAOw");
//    variables.put("ModuleName", "customer");

    
   // processEngine.getRuntimeService().startProcessInstanceByKey(SMART_FORM_PROCESS_KEY, variables);
  }
}
