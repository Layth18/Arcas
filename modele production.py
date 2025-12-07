import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt

# --- Exemple de données fictives ---
data = {
    "annee": [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    "nb_arbres_jeune entre 0 et 5 ans ": [200, 250, 180, 150, 130, 120, 100, 80],
    "nb_arbres_mur entre 6 et 20 ans ": [600, 550, 650, 700, 720, 750, 770, 800],
    "nb_arbres_vieux": [200, 200, 220, 250, 250, 280, 280, 320],
    "pluie_mm": [400, 380, 450, 420, 430, 410, 390, 440],
    "temperature_moy": [18, 19, 17, 18, 18, 19, 20, 18],
    "rendement_kg": [5000, 4800, 5200, 5100, 5300, 5000, 5400, 5500]
}

df = pd.DataFrame(data)

# --- Ajouter le rendement de l'année précédente ---
df["rendement_prec"] = df["rendement_kg"].shift(1)
df = df.dropna()  # Supprimer la première ligne car pas de rendement précédent

# --- Préparer les données ---
X = df[["nb_arbres_jeune", "nb_arbres_mur", "nb_arbres_vieux",
        "pluie_mm", "temperature_moy", "rendement_prec"]]
y = df["rendement_kg"]

# --- Diviser en train/test ---
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# --- Créer le modèle ---
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# --- Prédiction sur test ---
y_pred = model.predict(X_test)

# --- Évaluation ---
mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f"MAE: {mae}")
print(f"RMSE: {rmse}")

# --- Prédiction pour l'année actuelle ---
# Exemple : nb_arbres_jeune = 50, nb_arbres_mur = 850, nb_arbres_vieux = 300
nouvelle_annee = pd.DataFrame({
    "nb_arbres_jeune": [50],
    "nb_arbres_mur": [850],
    "nb_arbres_vieux": [300],
    "pluie_mm": [430],
    "temperature_moy": [19],
    "rendement_prec": [5500]
})

prediction = model.predict(nouvelle_annee)
print(f"Rendement estimé pour l'année actuelle: {prediction[0]:.2f} kg")

# --- Visualisation ---
plt.plot(df["annee"], df["rendement_kg"], marker='o', label="Historique")
plt.scatter([2023], prediction, color='red', label="Prédiction 2023", s=100)
plt.xlabel("Année")
plt.ylabel("Rendement (kg)")
plt.title("Prédiction rendement oliviers")
plt.legend()
plt.show()
