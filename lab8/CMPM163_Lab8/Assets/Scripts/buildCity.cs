using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class buildCity : MonoBehaviour
{

    public GameObject[] buildings;
    public int mapWidth = 20;
    public int mapHeight = 20;
    //public int suburbRange = 5;
    public float noiseFactor = 10.0f;
    public int noiseSeed = 555;

    int buildingFootprint = 10;

    private int noiseBound;

    // Start is called before the first frame update
    void Start()
    {
        noiseBound = buildings.Length;
        if (noiseSeed == -1) noiseSeed = Random.Range(0, 3000);

        for (int h = 0; h < mapHeight; ++h)
        {
            for (int w = 0; w < mapWidth; ++w)
            {
                int noiseResult = (int)(Mathf.PerlinNoise(w / noiseFactor + noiseSeed, h / noiseFactor + noiseSeed) * noiseBound);
                Vector3 pos = new Vector3(w * buildingFootprint, 0, h * buildingFootprint);

                //bool isSkyScraper = ((h >= suburbRange && h <= (mapHeight - suburbRange)) && (w >= suburbRange && w <= (mapWidth - suburbRange)));
                //float minScale = isSkyScraper ? 0.75f : 0.3f;
                //float maxScale = isSkyScraper ? 1.5f : 0.5f;
                int buildingType = Mathf.Min(Mathf.FloorToInt(noiseResult), noiseBound - 1);

                GameObject curBuilding = Instantiate(buildings[buildingType], pos, Quaternion.identity);
                curBuilding.transform.localScale = new Vector3(1.0f, 0.3f * (buildingType + 1), 1.0f);

                int n = Mathf.FloorToInt(Random.Range(0, 3.99f));
                curBuilding.transform.Rotate(new Vector3(0.0f, 90 * n, 0.0f));
            }
        }

    }

    // Update is called once per frame
    void Update()
    {

    }
}
