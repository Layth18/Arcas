#include <WiFi.h>
#include <BlynkSimpleEsp32.h>

char ssid[] = "YOUR_WIFI_SSID";
char pass[] = "YOUR_WIFI_PASSWORD";
char auth[] = "YOUR_BLYNK_AUTH_TOKEN";

#define TRIG_OIL 5
#define ECHO_OIL 18

#define TRIG_BIN 19
#define ECHO_BIN 21

#define OIL_TANK_HEIGHT 100
#define BIN_HEIGHT 80

BlynkTimer timer;

long readDistance(int trigPin, int echoPin){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  long distance = duration * 0.034 / 2; // cm
  return distance;
}

int getLevel(long distance, long maxHeight){
  long level = maxHeight - distance;
  if(level > maxHeight) level = maxHeight;
  if(level < 0) level = 0;
  int percent = map(level, 0, maxHeight, 0, 100); // 0-100%
  return percent;
}

void sendSensorData(){
  long distanceOil = readDistance(TRIG_OIL, ECHO_OIL);
  int levelOil = getLevel(distanceOil, OIL_TANK_HEIGHT);
  Blynk.virtualWrite(V1, levelOil); // send to Blynk

  long distanceBin = readDistance(TRIG_BIN, ECHO_BIN);
  int levelBin = getLevel(distanceBin, BIN_HEIGHT);
  Blynk.virtualWrite(V2, levelBin); // send to Blynk

  Serial.print("Olive Oil Level: "); Serial.print(levelOil); Serial.println("%");
  Serial.print("Olive Bin Level: "); Serial.print(levelBin); Serial.println("%");
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_OIL, OUTPUT);
  pinMode(ECHO_OIL, INPUT);
  pinMode(TRIG_BIN, OUTPUT);
  pinMode(ECHO_BIN, INPUT);

  Blynk.begin(auth, ssid, pass);

  timer.setInterval(2000L, sendSensorData);
}

void loop() {
  Blynk.run();
  timer.run();
}
