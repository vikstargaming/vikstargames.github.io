using UnityEngine;

public class BallPhysics : MonoBehaviour
{
    public AudioSource goalSound;

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Goal"))
        {
            Debug.Log("GOAL!");
            goalSound.Play();
            transform.position = Vector3.zero;
            GetComponent<Rigidbody>().velocity = Vector3.zero;
        }
    }
}
