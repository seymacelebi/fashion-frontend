export const getStyleAdvice = (temp: number, condition: string) => {
  if (temp < 10)
    return "Hava oldukça soğuk. Kalın kabanını ve atkını hazırlamalısın.";
  if (temp >= 10 && temp < 20)
    return "Ilık ama serin bir hava var. Trençkot veya deri ceket şık bir seçim olur.";
  if (temp >= 20 && temp < 30)
    return "Hava çok güzel! Keten gömlek ve rahat bir pantolonla günün tadını çıkar.";
  if (condition.includes("yağmur"))
    return "Hafif yağış var, şemsiyeni almayı veya su geçirmeyen bir parça seçmeyi unutma.";
  return "Bugün stilini özgürce yansıtabileceğin harika bir hava var.";
};
