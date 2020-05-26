using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class buildCity : MonoBehaviour
{

    public GameObject[] buildings;
    public int mapWidth = 20;
    public int mapHeight = 20;
    public int suburbRange = 5;

    int buildingFootprint = 10;

    // Start is called before the first frame update
    void Start()
    {
        for (int h = 0; h <= mapHeight; ++h)
        {
            for (int w = 0; w <= mapWidth; ++w)
            {
                bool isSkyScraper = ((h >= suburbRange && h <= (mapHeight - suburbRange)) && (w >= suburbRange && w <= (mapWidth - suburbRange)));
                float minScale = isSkyScraper ? 0.75f : 0.3f;
                float maxScale = isSkyScraper ? 1.5f : 0.5f;
                float scale = Random.Range(minScale, maxScale);
                Vector3 pos = new Vector3(w * buildingFootprint, 0, h * buildingFootprint);

                int n = Random.Range(0, buildings.Length);
                GameObject curBuilding = Instantiate(buildings[n], pos, Quaternion.identity);
                curBuilding.transform.localScale = new Vector3(1.0f, scale, 1.0f);
            }
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
