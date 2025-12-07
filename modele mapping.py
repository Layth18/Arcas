import pandas as pd
import matplotlib.pyplot as plt
import math

data = {
    "nom": ["Champ 1", "Champ 2", "Champ 3", "Champ 4", "Champ 5"],
    "x": [2, 5, 1, 6, 7],
    "y": [3, 4, 7, 1, 6],
    "quantite_kg": [1000, 1200, 800, 1500, 900]
}
df = pd.DataFrame(data)

mill = {"x": 0, "y": 0, "capacite_kg": 3000}

num_trucks = 2
truck_capacity = 3000
starting_pos = df.iloc[0][["x","y"]].to_list()  # tous les trucks partent du même champ

colors = ['red', 'blue', 'green', 'orange', 'purple', 'brown']

df['truck_id'] = [i % num_trucks for i in range(len(df))]

itineraire_trucks = []
total_distance_trucks = []

for t in range(num_trucks):
    df_local = df[df['truck_id'] == t].copy()  # champs attribués à ce truck
    champs_restants = df_local.index[df_local["quantite_kg"]>0].tolist()
    truck_position = starting_pos.copy()
    truck_load = 0
    itineraire = [("Truck "+str(t+1)+" Start", truck_position[0], truck_position[1])]
    total_distance = 0

    while len(champs_restants) > 0:
        distances = []
        for i in champs_restants:
            champ_pos = df_local.loc[i, ["x","y"]].to_list()
            dist = math.hypot(champ_pos[0]-truck_position[0], champ_pos[1]-truck_position[1])
            distances.append((dist, i))
        distances.sort()
        dist_min, champ_index = distances[0]

        reste_champ = df_local.loc[champ_index, "quantite_kg"]
        max_possible = min(truck_capacity - truck_load, reste_champ, mill["capacite_kg"])
        truck_load += max_possible
        df_local.loc[champ_index, "quantite_kg"] -= max_possible
        total_distance += dist_min
        truck_position = df_local.loc[champ_index, ["x","y"]].to_list()
        itineraire.append((df_local.loc[champ_index,"nom"], truck_position[0], truck_position[1]))

        champs_possible = [i for i in champs_restants if df_local.loc[i,"quantite_kg"]>0 and truck_load < truck_capacity]
        if truck_load >= truck_capacity or len(champs_possible) == 0:
            dist_to_mill = math.hypot(truck_position[0]-mill["x"], truck_position[1]-mill["y"])
            total_distance += dist_to_mill
            truck_position = [mill["x"], mill["y"]]
            itineraire.append(("Mill", truck_position[0], truck_position[1]))
            truck_load = 0

        champs_restants = df_local.index[df_local["quantite_kg"]>0].tolist()

    itineraire_trucks.append(itineraire)
    total_distance_trucks.append(total_distance)

for t, itin in enumerate(itineraire_trucks):
    print(f"Itinéraire Truck {t+1}:")
    for stop in itin:
        print(stop)
    print(f"Distance totale parcourue : {total_distance_trucks[t]:.2f} km\n")

plt.figure(figsize=(8,6))
for t, itin in enumerate(itineraire_trucks):
    for stop in itin:
        plt.scatter(stop[1], stop[2], c=colors[t % len(colors)], s=100)
    for i in range(len(itin)-1):
        x_vals = [itin[i][1], itin[i+1][1]]
        y_vals = [itin[i][2], itin[i+1][2]]
        plt.plot(x_vals, y_vals, color=colors[t % len(colors)], linewidth=2, label=f"Truck {t+1}" if i==0 else "")
plt.scatter(mill["x"], mill["y"], c='green', s=200, label="Mill")
plt.xlabel("X")
plt.ylabel("Y")
plt.title("Itinéraires multi-trucks (champs distincts vers Mill)")
plt.legend()
plt.grid(True)
plt.show()

