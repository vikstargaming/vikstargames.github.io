using UnityEngine;

public class GoalTrigger : MonoBehaviour
{
    public string scoringTeam;

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Ball"))
        {
            Debug.Log(scoringTeam + " scored!");
            // Add scoring logic here
        }
    }
}
